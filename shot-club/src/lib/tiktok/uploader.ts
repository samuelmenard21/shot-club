import { appendFileSync, mkdirSync } from "fs";
import { join } from "path";

export interface UploadResult {
  draftId: string;
  uploadedAt: string;
  url?: string;
}

export interface TikTokErrorDetails {
  code: string;
  message: string;
  retryable: boolean;
}

export class TikTokError extends Error {
  constructor(
    message: string,
    public details: TikTokErrorDetails
  ) {
    super(message);
    this.name = "TikTokError";
  }
}

interface TokenResponse {
  access_token?: string;
  expires_in?: number;
  error?: string;
  error_description?: string;
}

interface UploadResponse {
  data?: {
    upload_id: string;
  };
  error?: {
    code: string;
    message: string;
  };
}

class TikTokUploader {
  private accessToken: string;
  private refreshToken: string;
  private tokenExpiry: number = 0;
  private clientId: string;
  private clientSecret: string;
  private logDir: string;

  constructor(
    accessToken: string,
    refreshToken: string = "",
    clientId: string = "",
    clientSecret: string = ""
  ) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.logDir = join(process.cwd(), "logs");
    this.ensureLogDir();
  }

  private ensureLogDir(): void {
    try {
      mkdirSync(this.logDir, { recursive: true });
    } catch (err) {
      console.error(`Failed to create logs directory: ${err}`);
    }
  }

  private log(level: string, message: string, data?: unknown): void {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      ...(data && { data }),
    };

    const logLine = JSON.stringify(logEntry);
    const logPath = join(this.logDir, "tiktok-uploader.log");

    try {
      appendFileSync(logPath, logLine + "\n");
    } catch (err) {
      console.error(`Failed to write log: ${err}`);
    }
  }

  private async refreshAccessToken(): Promise<void> {
    if (!this.refreshToken || !this.clientId || !this.clientSecret) {
      this.log("warn", "Cannot refresh token: missing refresh_token or client credentials");
      return;
    }

    try {
      this.log("info", "Attempting token refresh");

      const response = await fetch("https://open.tiktokapis.com/v1/oauth/token/refresh/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          grant_type: "refresh_token",
          refresh_token: this.refreshToken,
        }).toString(),
      });

      const data = (await response.json()) as TokenResponse;

      if (data.access_token) {
        this.accessToken = data.access_token;
        this.tokenExpiry = Date.now() + (data.expires_in ?? 7200) * 1000;
        this.log("info", "Token refreshed successfully");
      } else {
        this.log("error", "Token refresh failed", {
          error: data.error,
          description: data.error_description,
        });
      }
    } catch (err) {
      this.log("error", "Token refresh request failed", { error: String(err) });
    }
  }

  private isTokenExpired(): boolean {
    return this.tokenExpiry > 0 && Date.now() > this.tokenExpiry;
  }

  private ensureValidToken(): boolean {
    if (this.isTokenExpired()) {
      this.refreshAccessToken();
    }
    return !!this.accessToken;
  }

  private async makeRequest(
    method: string,
    url: string,
    body?: unknown,
    headers: Record<string, string> = {}
  ): Promise<Response> {
    if (!this.ensureValidToken()) {
      throw new TikTokError("Invalid or expired access token", {
        code: "INVALID_TOKEN",
        message: "No valid access token available",
        retryable: false,
      });
    }

    const defaultHeaders = {
      Authorization: `Bearer ${this.accessToken}`,
      ...headers,
    };

    const options: RequestInit = {
      method,
      headers: defaultHeaders,
    };

    if (body) {
      options.body = typeof body === "string" ? body : JSON.stringify(body);
    }

    this.log("info", `Request: ${method} ${url}`, { headers: defaultHeaders });

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();
      this.log("error", `Response: ${response.status}`, {
        status: response.status,
        body: errorText,
      });
    }

    return response;
  }

  async uploadDraft(
    video: Buffer,
    caption: string,
    hashtags: string[] = []
  ): Promise<UploadResult> {
    const maxRetries = 3;
    let lastError: TikTokError | Error | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        this.log("info", `Upload attempt ${attempt}/${maxRetries}`, {
          captionLength: caption.length,
          hashtagCount: hashtags.length,
        });

        const uploadUrl = "https://open.tiktokapis.com/v1/post/publish/action/upload/";

        const formData = new FormData();
        formData.append("video", new Blob([video], { type: "video/mp4" }), "card.mp4");

        const response = await this.makeRequest("POST", uploadUrl, formData, {
          "Content-Type": "multipart/form-data",
        });

        const data = (await response.json()) as UploadResponse;

        if (!response.ok) {
          const errorCode = data.error?.code || "UNKNOWN_ERROR";
          const errorMsg = data.error?.message || "Upload failed";

          const retryable =
            response.status >= 500 || response.status === 429 || response.status === 408;

          lastError = new TikTokError(errorMsg, {
            code: errorCode,
            message: errorMsg,
            retryable,
          });

          if (!retryable) {
            throw lastError;
          }

          if (attempt < maxRetries) {
            const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
            this.log("warn", `Retryable error, waiting ${delay}ms before retry`, {
              error: errorCode,
            });
            await new Promise((resolve) => setTimeout(resolve, delay));
            continue;
          }

          throw lastError;
        }

        if (!data.data?.upload_id) {
          throw new TikTokError("No upload_id in response", {
            code: "INVALID_RESPONSE",
            message: "TikTok API returned no upload_id",
            retryable: false,
          });
        }

        const result: UploadResult = {
          draftId: data.data.upload_id,
          uploadedAt: new Date().toISOString(),
        };

        this.log("info", "Upload successful", result);
        return result;
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));

        if (err instanceof TikTokError) {
          this.log("error", "TikTok API error", {
            code: err.details.code,
            message: err.details.message,
            retryable: err.details.retryable,
            attempt,
          });

          if (!err.details.retryable || attempt === maxRetries) {
            throw err;
          }
        } else {
          this.log("error", "Unexpected error during upload", {
            error: String(err),
            attempt,
          });

          if (attempt === maxRetries) {
            throw lastError;
          }
        }

        if (attempt < maxRetries) {
          const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }

    throw lastError || new Error("Upload failed after all retries");
  }

  async publishDraft(
    uploadId: string,
    caption: string,
    hashtags: string[] = []
  ): Promise<{ videoId: string; publishedAt: string }> {
    this.log("info", "Publishing draft", { uploadId, captionLength: caption.length });

    const fullCaption = [caption, hashtags.join(" ")].filter(Boolean).join("\n");

    const response = await this.makeRequest(
      "POST",
      "https://open.tiktokapis.com/v1/post/publish/action/publish/",
      {
        post_info: {
          title: caption.substring(0, 150),
          description: fullCaption,
        },
        source_info: {
          source: "FILE_UPLOAD",
          file_name: `pmc-card-${Date.now()}.mp4`,
        },
      }
    );

    const data = (await response.json()) as { data?: { video_id?: string } };

    if (!response.ok || !data.data?.video_id) {
      throw new TikTokError("Failed to publish draft", {
        code: "PUBLISH_FAILED",
        message: "TikTok API did not return video_id",
        retryable: false,
      });
    }

    const result = {
      videoId: data.data.video_id,
      publishedAt: new Date().toISOString(),
    };

    this.log("info", "Draft published successfully", result);
    return result;
  }
}

export function createUploader(token: string): TikTokUploader {
  const refreshToken = process.env.TIKTOK_REFRESH_TOKEN || "";
  const clientId = process.env.TIKTOK_CLIENT_ID || "";
  const clientSecret = process.env.TIKTOK_CLIENT_SECRET || "";

  return new TikTokUploader(token, refreshToken, clientId, clientSecret);
}

export async function getAccessToken(): Promise<string> {
  const token = process.env.TIKTOK_ACCESS_TOKEN;

  if (!token) {
    throw new Error(
      "TIKTOK_ACCESS_TOKEN env var not set. Set it in .env or export TIKTOK_ACCESS_TOKEN=your_token"
    );
  }

  return token;
}
