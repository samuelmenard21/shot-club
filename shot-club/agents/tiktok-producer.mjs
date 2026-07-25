#!/usr/bin/env node
/**
 * tiktok-producer.mjs
 * Daily TikTok content producer agent. Runs at 6 AM every morning.
 *
 * Flow:
 * 1. Parse content-queue.md for today's slot
 * 2. Fetch game data from Supabase
 * 3. Render card variants using capture-card.mjs
 * 4. Generate captions from template
 * 5. Upload each to TikTok drafts
 * 6. Write summary JSON to tiktok-publish-queue.json
 *
 * Usage: node agents/tiktok-producer.mjs
 */

import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";
import { createClient } from "@supabase/supabase-js";

const execAsync = promisify(exec);

interface QueueEntry {
  date: string;
  format: string;
  gameId: string;
  variants: string[];
  hookTemplate: string;
  hashtags: string;
  notes: string;
}

interface PublishQueueEntry {
  date: string;
  format: string;
  gameId: string;
  variants: string[];
  draftIds: string[];
  captions: string[];
  status: "ready-for-publish" | "published" | "failed";
  message: string;
  errors?: string[];
}

const REPO_ROOT = process.cwd();
const CONTENT_QUEUE_PATH = path.join(REPO_ROOT, "content-queue.md");
const PUBLISH_QUEUE_PATH = path.join(REPO_ROOT, "tiktok-publish-queue.json");
const LOGS_DIR = path.join(REPO_ROOT, "logs");

function log(level: string, msg: string, data?: unknown): void {
  const timestamp = new Date().toISOString();
  const entry = { timestamp, level, msg, ...(data && { data }) };
  console.log(JSON.stringify(entry));

  try {
    if (!fs.existsSync(LOGS_DIR)) {
      fs.mkdirSync(LOGS_DIR, { recursive: true });
    }
    const logPath = path.join(LOGS_DIR, "producer.log");
    fs.appendFileSync(logPath, JSON.stringify(entry) + "\n");
  } catch (err) {
    console.error("Failed to write log:", err);
  }
}

function getToday(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getDayOfWeek(date: string): string {
  const d = new Date(date);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[d.getDay()];
}

function parseContentQueue(): QueueEntry | null {
  try {
    const content = fs.readFileSync(CONTENT_QUEUE_PATH, "utf-8");
    const today = new Date();
    const dayName = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ][today.getDay()];

    const lines = content.split("\n");
    let currentDay: string | null = null;
    let entry: Partial<QueueEntry> = {};

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.includes(`### ${dayName},`)) {
        currentDay = dayName;
        entry = {};
      }

      if (currentDay === dayName) {
        if (line.includes("**Format**:")) {
          entry.format = line.split("**Format**:")[1].trim();
        } else if (line.includes("**Game ID**:")) {
          entry.gameId = line.split("**Game ID**:")[1].trim();
        } else if (line.includes("**Render Variants**:")) {
          const varStr = line.split("**Render Variants**:")[1].trim();
          try {
            entry.variants = JSON.parse(varStr);
          } catch {
            entry.variants = ["vintage"];
          }
        } else if (line.includes("**Hook Template**:")) {
          entry.hookTemplate = line.split("**Hook Template**:")[1].trim();
        } else if (line.includes("**Hashtags**:")) {
          entry.hashtags = line.split("**Hashtags**:")[1].trim();
        } else if (line.includes("**Notes**:")) {
          entry.notes = line.split("**Notes**:")[1].trim();
        }
      }

      if (
        currentDay === dayName &&
        i > 0 &&
        line.startsWith("---") &&
        entry.format
      ) {
        return {
          date: getToday(),
          format: entry.format || "the-pull",
          gameId: entry.gameId || "sample",
          variants: entry.variants || ["vintage"],
          hookTemplate:
            entry.hookTemplate || "Fresh card from Pull My Card {team}",
          hashtags: entry.hashtags || "#hockeycard #youth",
          notes: entry.notes || "",
        };
      }
    }

    if (entry.format) {
      return {
        date: getToday(),
        format: entry.format,
        gameId: entry.gameId || "sample",
        variants: entry.variants || ["vintage"],
        hookTemplate:
          entry.hookTemplate || "Fresh card from Pull My Card {team}",
        hashtags: entry.hashtags || "#hockeycard #youth",
        notes: entry.notes || "",
      };
    }
  } catch (err) {
    log("error", "Failed to parse content queue", err);
  }

  return null;
}

async function fetchGameData(gameId: string): Promise<Record<string, unknown>> {
  try {
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      log("warn", "Supabase credentials not set; using sample game data");
      return getSampleGameData(gameId);
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from("games")
      .select("*")
      .eq("id", gameId)
      .single();

    if (error || !data) {
      log("warn", `Game ${gameId} not found in Supabase`, error);
      return getSampleGameData(gameId);
    }

    return data;
  } catch (err) {
    log("error", "Failed to fetch game data", err);
    return getSampleGameData(gameId);
  }
}

function getSampleGameData(gameId: string): Record<string, unknown> {
  return {
    id: gameId,
    team: "Stoney Creek Sabres",
    opponent: "North Stars",
    date: new Date().toISOString().split("T")[0],
    players: [
      {
        name: "Olivia Menard",
        pos: "C",
        team: "Sabres",
        stats: { goals: 3, assists: 1, sog: 5 },
        achievement: "Hat Trick",
      },
    ],
  };
}

function interpolateTemplate(
  template: string,
  data: Record<string, string>
): string {
  let result = template;
  for (const [key, value] of Object.entries(data)) {
    result = result.replace(`{${key}}`, value);
  }
  return result;
}

async function renderCardVariant(
  variant: string,
  cardData: Record<string, unknown>
): Promise<string | null> {
  try {
    const outputDir = path.join(REPO_ROOT, "dist", "cards");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, `${variant}-${Date.now()}.png`);
    const dataJson = JSON.stringify(cardData);

    log("info", `Rendering card variant: ${variant}`);

    const cmd = `node scripts/capture-card.mjs --style=${variant} --data='${dataJson.replace(/'/g, "'\\''")}'  --output=${outputPath}`;

    const { stdout, stderr } = await execAsync(cmd, {
      cwd: REPO_ROOT,
      timeout: 30000,
    });

    if (stderr) {
      log("warn", `Capture warnings for ${variant}`, stderr);
    }

    if (fs.existsSync(outputPath)) {
      log("info", `Rendered ${variant} to ${outputPath}`);
      return outputPath;
    } else {
      log("error", `Render failed: file not created for ${variant}`);
      return null;
    }
  } catch (err) {
    log("error", `Failed to render variant ${variant}`, err);
    return null;
  }
}

async function uploadCardToDraft(
  imageBuffer: Buffer,
  caption: string,
  hashtags: string[]
): Promise<string | null> {
  try {
    const { createUploader, getAccessToken } = await import(
      "../src/lib/tiktok/uploader.ts"
    );

    const token = await getAccessToken();
    const uploader = createUploader(token);

    const result = await uploader.uploadDraft(imageBuffer, caption, hashtags);
    log("info", "Card uploaded to TikTok drafts", result);

    return result.draftId;
  } catch (err) {
    log("error", "Failed to upload card to TikTok", err);
    return null;
  }
}

async function main(): Promise<void> {
  log("info", "TikTok Producer Agent starting");

  const queueEntry = parseContentQueue();

  if (!queueEntry) {
    log("error", "No queue entry found for today");
    process.exit(1);
  }

  log("info", "Queue entry loaded", queueEntry);

  const gameData = await fetchGameData(queueEntry.gameId);
  log("info", "Game data fetched", gameData);

  const cardData = buildCardData(gameData);

  const templateData: Record<string, string> = {
    team: String(gameData.team || "Team"),
    opponent: String(gameData.opponent || "Opponent"),
    date: String(gameData.date || new Date().toISOString().split("T")[0]),
    player: String((gameData as any)?.players?.[0]?.name || "Player"),
    name: String((gameData as any)?.players?.[0]?.name || "Player"),
    achievement: String(
      (gameData as any)?.players?.[0]?.achievement || "Achievement"
    ),
    stat_highlight: String(
      (gameData as any)?.players?.[0]?.stats?.goals || "0"
    ),
    sponsor: "Premium Meat Pack",
  };

  const baseCaption = interpolateTemplate(
    queueEntry.hookTemplate,
    templateData
  );
  const hashtagList = queueEntry.hashtags
    .split("#")
    .filter((tag) => tag.trim())
    .map((tag) => "#" + tag.trim());

  log("info", "Generated base caption", { baseCaption, hashtagCount: hashtagList.length });

  const renderedPaths: Array<{ variant: string; path: string }> = [];

  for (const variant of queueEntry.variants) {
    const imagePath = await renderCardVariant(variant, cardData);
    if (imagePath) {
      renderedPaths.push({ variant, path: imagePath });
    } else {
      log("warn", `Failed to render variant ${variant}; skipping`);
    }
  }

  if (renderedPaths.length === 0) {
    log("error", "No card variants were successfully rendered");
    process.exit(1);
  }

  log("info", `Rendered ${renderedPaths.length} variants`, { variants: renderedPaths });

  const publishQueue: PublishQueueEntry = {
    date: queueEntry.date,
    format: queueEntry.format,
    gameId: queueEntry.gameId,
    variants: renderedPaths.map((r) => r.variant),
    draftIds: [],
    captions: [],
    status: "ready-for-publish",
    message: "",
    errors: [],
  };

  for (const { variant, path: imagePath } of renderedPaths) {
    try {
      const imageBuffer = fs.readFileSync(imagePath);

      const caption = `${baseCaption} — ${variant.toUpperCase()}`;

      log("info", `Uploading ${variant} variant`, { caption });

      const draftId = await uploadCardToDraft(imageBuffer, caption, hashtagList);

      if (draftId) {
        publishQueue.draftIds.push(draftId);
        publishQueue.captions.push(caption);
      } else {
        publishQueue.errors = publishQueue.errors || [];
        publishQueue.errors.push(`Failed to upload ${variant} variant`);
      }
    } catch (err) {
      log("error", `Error uploading ${variant}`, err);
      publishQueue.errors = publishQueue.errors || [];
      publishQueue.errors.push(`Exception uploading ${variant}: ${String(err)}`);
    }
  }

  if (publishQueue.draftIds.length === 0) {
    publishQueue.status = "failed";
    publishQueue.message =
      "All uploads failed. Check logs for details. No drafts created.";
    log("error", "All uploads failed");
  } else if (publishQueue.draftIds.length < renderedPaths.length) {
    publishQueue.status = "ready-for-publish";
    publishQueue.message = `${publishQueue.draftIds.length}/${renderedPaths.length} drafts uploaded. Check logs for failures. Open TikTok app, add audio, and publish.`;
    log("warn", publishQueue.message);
  } else {
    publishQueue.status = "ready-for-publish";
    publishQueue.message = `${publishQueue.draftIds.length} drafts uploaded successfully. Open TikTok app, add audio, and publish.`;
    log("info", publishQueue.message);
  }

  fs.writeFileSync(PUBLISH_QUEUE_PATH, JSON.stringify(publishQueue, null, 2));

  log("info", "Publish queue written", publishQueue);
  console.log("\n=== PRODUCER SUMMARY ===");
  console.log(JSON.stringify(publishQueue, null, 2));
}

function buildCardData(gameData: Record<string, unknown>): Record<string, unknown> {
  const player = (gameData as any)?.players?.[0] || {};

  return {
    cls: "",
    team: gameData.team || "Team",
    div: "Youth",
    num: player.num || "00",
    pos: player.pos || "C",
    posLong: player.posLong || "Center",
    posShort: player.pos || "C",
    name: player.name || "Player",
    first: (player.name || "Player").split(" ")[0],
    lastUpper: (player.name || "Player").split(" ")[1]?.toUpperCase() || "NAME",
    tag: `${player.achievement || "Notable Game"} vs ${gameData.opponent || "Opponent"}`,
    headline: `${player.achievement || "Achievement"} vs ${gameData.opponent || "Opponent"}`,
    serial: `SHARE · ${Math.floor(Math.random() * 999).toString().padStart(3, "0")}/999`,
    achv: (player.achievement || "ACHIEVEMENT").toUpperCase(),
    miniStat: `${player.stats?.goals || 0} G`,
    date: gameData.date || new Date().toISOString().split("T")[0],
    hero: 0,
    photo: "",
    filled: "0",
    photo2: "",
    filled2: "0",
    stats: [
      { n: String(player.stats?.goals || 0), l: "G" },
      { n: String(player.stats?.assists || 0), l: "A" },
      { n: String((player.stats?.goals || 0) + (player.stats?.assists || 0)), l: "PTS" },
      { n: String(player.stats?.sog || 0), l: "SOG" },
      { n: "+0", l: "+/-" },
    ],
  };
}

main().catch((err) => {
  log("error", "Producer agent failed", err);
  process.exit(1);
});
