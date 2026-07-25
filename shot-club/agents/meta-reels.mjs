#!/usr/bin/env node

/**
 * Meta Reels Agent
 * Reposts top-performing TikToks to Instagram Reels
 * Runs: Tue/Thu 2 PM
 */

import fetch from 'node-fetch'
import logger from '../src/lib/logger.js'

const AGENT_NAME = 'meta-reels'

// Environment variables
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN
const META_IG_BUSINESS_ACCOUNT_ID = process.env.META_IG_BUSINESS_ACCOUNT_ID
const TIKTOK_ACCESS_TOKEN = process.env.TIKTOK_ACCESS_TOKEN

class MetaReelsPublisher {
  constructor() {
    this.validateEnv()
  }

  validateEnv() {
    if (!META_ACCESS_TOKEN) {
      throw new Error('META_ACCESS_TOKEN environment variable is required')
    }
    if (!META_IG_BUSINESS_ACCOUNT_ID) {
      throw new Error('META_IG_BUSINESS_ACCOUNT_ID environment variable is required')
    }
    if (!TIKTOK_ACCESS_TOKEN) {
      logger.warn(AGENT_NAME, 'TIKTOK_ACCESS_TOKEN not set; agent will skip TikTok fetch')
    }
  }

  /**
   * Fetch top TikToks from last 3 days with views > 5000
   */
  async getTopTikToks() {
    if (!TIKTOK_ACCESS_TOKEN) {
      logger.warn(AGENT_NAME, 'Skipping TikTok fetch; TIKTOK_ACCESS_TOKEN not set')
      return []
    }

    try {
      // TikTok API endpoint to get recent videos
      const thirtyHoursAgo = new Date(Date.now() - 30 * 60 * 60 * 1000)

      const response = await fetch(
        `https://open.tiktokapis.com/v1/video/list?`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${TIKTOK_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(`TikTok API error: ${error.message || response.statusText}`)
      }

      const data = await response.json()

      // Filter videos with views > 5000
      const topVideos = (data.data?.videos || [])
        .filter((video) => video.statistics?.view_count > 5000)
        .sort((a, b) => (b.statistics?.view_count || 0) - (a.statistics?.view_count || 0))
        .slice(0, 1) // Get top 1 video

      logger.info(AGENT_NAME, `Found ${topVideos.length} top TikToks`, {
        viewThreshold: 5000,
      })

      return topVideos
    } catch (error) {
      logger.error(AGENT_NAME, 'Failed to fetch top TikToks', {
        error: error.message,
      })
      return []
    }
  }

  /**
   * Download video from TikTok
   */
  async downloadTikTokVideo(videoUrl) {
    try {
      const response = await fetch(videoUrl)

      if (!response.ok) {
        throw new Error(`Download failed: ${response.statusText}`)
      }

      return await response.buffer()
    } catch (error) {
      logger.error(AGENT_NAME, 'Failed to download TikTok video', {
        error: error.message,
      })
      throw error
    }
  }

  /**
   * Upload video to Instagram Reels
   */
  async uploadReelToInstagram(videoBuffer, caption) {
    try {
      const formData = new FormData()
      const blob = new Blob([videoBuffer], { type: 'video/mp4' })
      formData.append('video_data', blob, 'reel.mp4')
      formData.append('caption', caption)
      formData.append('media_type', 'REELS')

      const response = await fetch(
        `https://graph.instagram.com/v18.0/${META_IG_BUSINESS_ACCOUNT_ID}/media`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${META_ACCESS_TOKEN}`,
          },
          body: formData,
        }
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(
          `Meta API error: ${error.error?.message || response.statusText}`
        )
      }

      const data = await response.json()
      logger.info(AGENT_NAME, 'Uploaded reel to Instagram', {
        mediaId: data.id,
      })

      return data.id
    } catch (error) {
      logger.error(AGENT_NAME, 'Failed to upload reel to Instagram', {
        error: error.message,
      })
      throw error
    }
  }

  /**
   * Publish reel to feed
   */
  async publishReel(mediaId) {
    try {
      const response = await fetch(
        `https://graph.instagram.com/v18.0/${mediaId}/publish`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${META_ACCESS_TOKEN}`,
          },
        }
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(
          `Meta API error: ${error.error?.message || response.statusText}`
        )
      }

      logger.info(AGENT_NAME, 'Published reel to feed', { mediaId })
      return true
    } catch (error) {
      logger.error(AGENT_NAME, 'Failed to publish reel', {
        error: error.message,
      })
      throw error
    }
  }

  /**
   * Generate caption from TikTok caption
   */
  generateCaption(tiktokCaption) {
    // Add #ItsNotJustACard hashtag and clean up caption
    const cleanCaption = tiktokCaption
      .split('\n')
      .filter((line) => !line.startsWith('@'))
      .join('\n')
      .trim()

    return `${cleanCaption}\n\n#ItsNotJustACard #TradingCards #Hockey #YouthSports`
  }

  /**
   * Main run function
   */
  async run() {
    logger.info(AGENT_NAME, 'Starting Meta Reels Publisher agent')

    try {
      const topTikToks = await this.getTopTikToks()

      if (topTikToks.length === 0) {
        logger.info(AGENT_NAME, 'No top TikToks found to repost')
        return
      }

      for (const tiktok of topTikToks) {
        try {
          logger.info(AGENT_NAME, 'Processing TikTok video', {
            videoId: tiktok.id,
            viewCount: tiktok.statistics?.view_count,
          })

          // Download the video
          const videoBuffer = await this.downloadTikTokVideo(tiktok.download_url)

          // Generate caption
          const caption = this.generateCaption(tiktok.desc || 'Check out this amazing card pull!')

          // Upload to Instagram
          const mediaId = await this.uploadReelToInstagram(videoBuffer, caption)

          // Publish to feed
          await this.publishReel(mediaId)

          logger.info(AGENT_NAME, 'Successfully reposted TikTok to Instagram Reels', {
            videoId: tiktok.id,
          })
        } catch (error) {
          logger.error(AGENT_NAME, 'Failed to repost individual TikTok', {
            videoId: tiktok.id,
            error: error.message,
          })
          // Continue with next video instead of failing entire run
        }
      }

      logger.info(AGENT_NAME, 'Meta Reels Publisher agent completed successfully')
    } catch (error) {
      logger.error(AGENT_NAME, 'Meta Reels Publisher agent failed', {
        error: error.message,
      })
      process.exit(1)
    }
  }
}

// Run the agent
const reelsPublisher = new MetaReelsPublisher()
await reelsPublisher.run()
