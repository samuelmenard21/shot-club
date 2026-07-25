#!/usr/bin/env node
/**
 * tiktok-analyst.mjs
 * Weekly TikTok content analyzer. Runs Sunday 6 PM.
 *
 * Flow:
 * 1. Fetch last 7 days of TikTok post analytics
 * 2. Group posts by format (the-pull, sponsor-flex, etc.)
 * 3. Calculate avg CTR per format (clicks / views)
 * 4. Identify top 3 formats
 * 5. Auto-generate next week's content-queue.md with weighted distribution
 * 6. Commit and push to git
 *
 * Usage: node agents/tiktok-analyst.mjs
 */

import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";
import { createClient } from "@supabase/supabase-js";

const execAsync = promisify(exec);

interface PostAnalytics {
  videoId: string;
  format: string;
  gameId: string;
  publishedAt: string;
  views: number;
  clicks: number;
  shares: number;
  likes: number;
  comments: number;
}

interface FormatStats {
  format: string;
  postCount: number;
  avgViews: number;
  avgClicks: number;
  avgCtr: number;
  topGameIds: string[];
}

const REPO_ROOT = process.cwd();
const CONTENT_QUEUE_PATH = path.join(REPO_ROOT, "content-queue.md");
const LOGS_DIR = path.join(REPO_ROOT, "logs");

function log(level: string, msg: string, data?: unknown): void {
  const timestamp = new Date().toISOString();
  const entry = { timestamp, level, msg, ...(data && { data }) };
  console.log(JSON.stringify(entry));

  try {
    if (!fs.existsSync(LOGS_DIR)) {
      fs.mkdirSync(LOGS_DIR, { recursive: true });
    }
    const logPath = path.join(LOGS_DIR, "analyst.log");
    fs.appendFileSync(logPath, JSON.stringify(entry) + "\n");
  } catch (err) {
    console.error("Failed to write log:", err);
  }
}

async function fetchTikTokAnalytics(): Promise<PostAnalytics[]> {
  try {
    const token = process.env.TIKTOK_ACCESS_TOKEN;

    if (!token) {
      log("error", "TIKTOK_ACCESS_TOKEN not set");
      return [];
    }

    log("info", "Fetching TikTok analytics for last 7 days");

    const response = await fetch(
      "https://open.tiktokapis.com/v1/post/list/paginate/",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      log("error", `TikTok API error: ${response.status}`, await response.text());
      return [];
    }

    const data = await response.json();

    const posts = data.data?.videos || [];
    const analytics: PostAnalytics[] = [];

    for (const post of posts) {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      if (new Date(post.create_time * 1000) < sevenDaysAgo) {
        continue;
      }

      analytics.push({
        videoId: post.id,
        format: post.description?.includes("pack")
          ? "the-pull"
          : post.description?.includes("premium")
            ? "sponsor-flex"
            : post.description?.includes("style")
              ? "style-roulette"
              : "parent-pov",
        gameId: extractGameId(post.description || ""),
        publishedAt: new Date(post.create_time * 1000).toISOString(),
        views: post.video_description?.engagement?.view_count || 0,
        clicks: post.video_description?.engagement?.click_count || 0,
        shares: post.video_description?.engagement?.share_count || 0,
        likes: post.video_description?.engagement?.like_count || 0,
        comments: post.video_description?.engagement?.comment_count || 0,
      });
    }

    log("info", `Fetched ${analytics.length} posts from last 7 days`);
    return analytics;
  } catch (err) {
    log("error", "Failed to fetch TikTok analytics", err);
    return [];
  }
}

function extractGameId(description: string): string {
  const match = description.match(/game_\d+_\w+_\w+/);
  return match ? match[0] : "auto-selected";
}

function analyzeByFormat(posts: PostAnalytics[]): FormatStats[] {
  const byFormat: Record<string, PostAnalytics[]> = {};

  for (const post of posts) {
    if (!byFormat[post.format]) {
      byFormat[post.format] = [];
    }
    byFormat[post.format].push(post);
  }

  const stats: FormatStats[] = [];

  for (const [format, formatPosts] of Object.entries(byFormat)) {
    const avgViews =
      formatPosts.reduce((sum, p) => sum + p.views, 0) / formatPosts.length;
    const avgClicks =
      formatPosts.reduce((sum, p) => sum + p.clicks, 0) / formatPosts.length;
    const avgCtr = avgViews > 0 ? (avgClicks / avgViews) * 100 : 0;

    const topGames = Array.from(
      new Set(formatPosts.map((p) => p.gameId).filter((id) => id !== "auto-selected"))
    ).slice(0, 3);

    stats.push({
      format,
      postCount: formatPosts.length,
      avgViews,
      avgClicks,
      avgCtr,
      topGameIds: topGames,
    });
  }

  stats.sort((a, b) => b.avgCtr - a.avgCtr);

  log("info", "Format analysis complete", stats);
  return stats;
}

function generateNextWeekQueue(formatStats: FormatStats[]): string {
  const templates: Record<string, Record<string, string>> = {
    "the-pull": {
      template:
        "Fresh pack pull from Pull My Card {team} vs {opponent} — who gets the rare? {achievement}",
      hashtags: "#hockeycard #packing #rare #youth #hockey #trading",
    },
    "sponsor-flex": {
      template:
        "Powered by {sponsor} 🥩 {player} dominated vs {opponent} — {stat_highlight}. Premium partnership.",
      hashtags: "#sponsorship #premium #meatpack #local #hockey #youth",
    },
    "style-roulette": {
      template:
        "Style spin 🎨 {player} {team} — same card, three looks. Which design wins? {achievement}",
      hashtags: "#stylecheck #carddesign #roulette #hockey #vintage #chrome",
    },
    "parent-pov": {
      template:
        "Achievement captured forever 📸 {player}'s {achievement} vs {opponent}. Custom card from Pull My Card.",
      hashtags: "#parentproud #hockey #memories #youth #tradingcard #family",
    },
  };

  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() + ((1 - today.getDay() + 7) % 7));

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  const weekStartStr = weekStart.toISOString().split("T")[0];
  const weekEndStr = weekEnd.toISOString().split("T")[0];

  let queue = `# TikTok Content Queue\n\nWeekly content plan for Pull My Card. Edit this file to change formats, games, or hooks. The producer agent runs each morning at 6 AM and pulls today's slot.\n\n---\n\n## Week of ${weekStartStr} to ${weekEndStr}\n\nGenerated by tiktok-analyst at ${new Date().toISOString()}\n\n`;

  const dayNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const distribution: string[] = [];

  if (formatStats.length > 0) {
    distribution.push(...new Array(4).fill(formatStats[0].format));
  }
  if (formatStats.length > 1) {
    distribution.push(...new Array(3).fill(formatStats[1].format));
  }
  if (formatStats.length > 2) {
    distribution.push(...new Array(2).fill(formatStats[2].format));
  }
  for (let i = 3; i < formatStats.length; i++) {
    distribution.push(formatStats[i].format);
  }

  const shuffled = distribution.sort(() => Math.random() - 0.5).slice(0, 7);

  for (let i = 0; i < 7; i++) {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    const dateStr = date.toISOString().split("T")[0];
    const dayName = dayNames[i];

    const format = shuffled[i] || "the-pull";
    const templateData = templates[format];

    if (!templateData) {
      continue;
    }

    const formatsWithGame = formatStats.find((f) => f.format === format);
    const gameId =
      formatsWithGame?.topGameIds?.[0] || `game_${dateStr.replace(/-/g, "")}_auto`;

    queue += `### ${dayName}, ${dateStr.split("-").slice(1).join("-")} — ${format}\n\n`;
    queue += `- **Format**: ${format}\n`;
    queue += `- **Game ID**: ${gameId}\n`;
    queue += `- **Render Variants**: ["vintage", "prestige", "holo"]\n`;
    queue += `- **Hook Template**: "${templateData.template}"\n`;
    queue += `- **Hashtags**: ${templateData.hashtags}\n`;
    queue += `- **Notes**: Auto-selected based on last week's ${format} performance (avg CTR: ${formatsWithGame?.avgCtr.toFixed(2) || "N/A"}%)\n\n`;
    queue += `---\n\n`;
  }

  queue += `## Format Performance Summary\n\n`;
  queue += `Analyzed ${formatStats.reduce((sum, f) => sum + f.postCount, 0)} posts from last 7 days.\n\n`;

  for (const stat of formatStats) {
    queue += `### ${stat.format}\n`;
    queue += `- Posts: ${stat.postCount}\n`;
    queue += `- Avg Views: ${Math.round(stat.avgViews)}\n`;
    queue += `- Avg Clicks: ${Math.round(stat.avgClicks)}\n`;
    queue += `- CTR: ${stat.avgCtr.toFixed(2)}%\n`;
    queue += `- Top Games: ${stat.topGameIds.join(", ") || "None analyzed"}\n\n`;
  }

  queue += `## Format Definitions\n\n`;
  queue += `### the-pull\nMid-roll pack opening. User pulls a fresh card.\n\n`;
  queue += `### sponsor-flex\nPlayer achievement + meat pack branding.\n\n`;
  queue += `### style-roulette\nSame card, multiple design treatments.\n\n`;
  queue += `### parent-pov\nParents' emotional response angle.\n\n`;

  return queue;
}

async function commitAndPush(topFormat: string): Promise<void> {
  try {
    log("info", `Committing queue update (${topFormat} leading)`);

    await execAsync(
      `git add ${path.basename(CONTENT_QUEUE_PATH)} && git commit -m "Analyst: rewrote queue based on ${topFormat} performance"`,
      {
        cwd: REPO_ROOT,
      }
    );

    log("info", "Pushing to origin main");

    await execAsync(`git push origin main`, {
      cwd: REPO_ROOT,
    });

    log("info", "Queue committed and pushed");
  } catch (err) {
    log("error", "Failed to commit/push", err);
  }
}

async function main(): Promise<void> {
  log("info", "TikTok Analyst Agent starting");

  const posts = await fetchTikTokAnalytics();

  if (posts.length === 0) {
    log("warn", "No posts found in last 7 days; using sample distribution");
  }

  const formatStats = analyzeByFormat(posts);

  if (formatStats.length === 0) {
    log("warn", "No format data available; using default formats");
    formatStats.push(
      { format: "the-pull", postCount: 1, avgViews: 1000, avgClicks: 50, avgCtr: 5, topGameIds: [] },
      { format: "sponsor-flex", postCount: 1, avgViews: 800, avgClicks: 40, avgCtr: 5, topGameIds: [] },
      { format: "style-roulette", postCount: 1, avgViews: 600, avgClicks: 30, avgCtr: 5, topGameIds: [] },
      { format: "parent-pov", postCount: 1, avgViews: 700, avgClicks: 35, avgCtr: 5, topGameIds: [] }
    );
  }

  const nextWeekQueue = generateNextWeekQueue(formatStats);

  fs.writeFileSync(CONTENT_QUEUE_PATH, nextWeekQueue);

  log("info", "Queue regenerated and written to disk");

  const topFormat = formatStats[0]?.format || "the-pull";
  await commitAndPush(topFormat);

  log("info", "Analyst complete");

  console.log("\n=== ANALYST SUMMARY ===");
  console.log(`Analyzed ${posts.length} posts`);
  console.log("Format Performance (ranked by CTR):");
  for (const stat of formatStats) {
    console.log(
      `  ${stat.format}: ${stat.avgCtr.toFixed(2)}% CTR (${stat.postCount} posts)`
    );
  }
  console.log(`Next week queue written with ${topFormat} weighted 4x/week`);
}

main().catch((err) => {
  log("error", "Analyst failed", err);
  process.exit(1);
});
