#!/usr/bin/env node
/**
 * capture-card.mjs
 * Playwright script to render and capture trading cards from the /render/card endpoint.
 * Outputs a PNG or MP4 video (short duration for TikTok).
 *
 * Usage:
 *   node scripts/capture-card.mjs --style=vintage --data='{...}' --output=card.png [--format=png|mp4] [--scale=1.5]
 */

import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "fs";
import { dirname, resolve } from "path";

const BASE_URL = process.env.RENDER_CARD_URL || "https://boxscorecard.app";

interface CaptureOptions {
  style: string;
  data: Record<string, unknown>;
  output: string;
  format?: "png" | "mp4";
  scale?: number;
  bg?: string;
  duration?: number;
}

async function captureCard(options: CaptureOptions): Promise<void> {
  const {
    style,
    data,
    output,
    format = "png",
    scale = 1.5,
    bg = "transparent",
    duration = 3000,
  } = options;

  let browser;

  try {
    browser = await chromium.launch({
      headless: true,
    });

    const context = await browser.createBrowserContext({
      viewport: {
        width: Math.round(360 * scale),
        height: Math.round(504 * scale),
      },
    });

    const page = await context.newPage();

    const dataJson = encodeURIComponent(JSON.stringify(data));
    const url = `${BASE_URL}/render/card?style=${style}&data=${dataJson}&scale=${scale}&bg=${bg}`;

    console.log(`[capture-card] Loading ${url}`);

    await page.goto(url, { waitUntil: "networkidle" });

    await page.waitForLoadState("networkidle");

    const outputDir = dirname(output);
    mkdirSync(outputDir, { recursive: true });

    if (format === "mp4") {
      console.log(`[capture-card] Recording ${duration}ms video to ${output}`);

      const videoPath = resolve(output);
      await context.tracePlayer?.stop?.();

      const recording = await page.video?.();
      if (!recording) {
        throw new Error("Video recording not available in this browser context");
      }

      await new Promise((resolve) => setTimeout(resolve, duration));

      const videoBuffer = await recording.path();
      if (videoBuffer) {
        console.log(`[capture-card] Video saved to ${videoPath}`);
      }
    } else {
      console.log(`[capture-card] Capturing PNG to ${output}`);

      const screenshot = await page.screenshot({
        path: output,
        omitBackground: true,
      });

      console.log(
        `[capture-card] Screenshot saved (${(screenshot.length / 1024).toFixed(1)}KB)`
      );
    }

    await context.close();
  } catch (err) {
    console.error(`[capture-card] Error: ${err}`);
    throw err;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

function parseArgs(): CaptureOptions {
  const args = process.argv.slice(2);
  const options: Record<string, unknown> = {};

  for (const arg of args) {
    const [key, value] = arg.split("=");
    if (key.startsWith("--")) {
      const cleanKey = key.slice(2);
      options[cleanKey] = value;
    }
  }

  if (!options.style || typeof options.style !== "string") {
    throw new Error("--style is required (e.g., --style=vintage)");
  }

  if (!options.data || typeof options.data !== "string") {
    throw new Error("--data is required (URI-encoded JSON)");
  }

  if (!options.output || typeof options.output !== "string") {
    throw new Error("--output is required (path to save)");
  }

  let parsedData: Record<string, unknown>;
  try {
    parsedData = JSON.parse(options.data as string);
  } catch {
    throw new Error(`Invalid --data JSON: ${options.data}`);
  }

  return {
    style: options.style as string,
    data: parsedData,
    output: options.output as string,
    format: (options.format as "png" | "mp4") || "png",
    scale: options.scale ? parseFloat(options.scale as string) : 1.5,
    bg: (options.bg as string) || "transparent",
    duration: options.duration ? parseInt(options.duration as string) : 3000,
  };
}

async function main(): Promise<void> {
  try {
    const options = parseArgs();
    await captureCard(options);
    console.log(`[capture-card] Done`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
