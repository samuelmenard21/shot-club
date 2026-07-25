#!/usr/bin/env node

/**
 * Meta Publisher Agent
 * Posts to Instagram Business Account and Facebook Page
 * Runs: Mon/Wed/Fri 9 AM (IG Feed) and 10 AM (FB Page)
 */

import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'
import logger from '../src/lib/logger.js'

const AGENT_NAME = 'meta-publisher'

// Environment variables
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN
const META_PAGE_ID = process.env.META_PAGE_ID
const META_IG_BUSINESS_ACCOUNT_ID = process.env.META_IG_BUSINESS_ACCOUNT_ID
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5173/api'

class MetaPublisher {
  constructor() {
    this.validateEnv()
  }

  validateEnv() {
    if (!META_ACCESS_TOKEN) {
      throw new Error('META_ACCESS_TOKEN environment variable is required')
    }
    if (!META_PAGE_ID) {
      throw new Error('META_PAGE_ID environment variable is required')
    }
    if (!META_IG_BUSINESS_ACCOUNT_ID) {
      throw new Error('META_IG_BUSINESS_ACCOUNT_ID environment variable is required')
    }
  }

  /**
   * Get today's scheduled posts from content-queue.md
   */
  getScheduledPosts() {
    const today = new Date()
    const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][today.getDay()]

    // Map day to feed or reel
    const isPostDay = ['Mon', 'Wed', 'Fri'].includes(dayName)

    if (!isPostDay) {
      logger.info(AGENT_NAME, `No posts scheduled for ${dayName}`)
      return []
    }

    try {
      const queuePath = path.join(process.cwd(), 'content-queue.md')
      if (!fs.existsSync(queuePath)) {
        logger.warn(AGENT_NAME, 'content-queue.md not found')
        return []
      }

      const content = fs.readFileSync(queuePath, 'utf-8')

      // Parse the content for posts matching today's day
      const dayPattern = new RegExp(`### ${dayName} \\d{4}-\\d{2}-\\d{2}`, 'g')
      const matches = content.match(dayPattern)

      if (!matches || matches.length === 0) {
        logger.info(AGENT_NAME, `No posts found for ${dayName}`)
        return []
      }

      logger.info(AGENT_NAME, `Found ${matches.length} scheduled post(s) for ${dayName}`)
      return this.parsePostsFromQueue(content, dayName)
    } catch (error) {
      logger.error(AGENT_NAME, 'Failed to get scheduled posts', {
        error: error.message,
      })
      return []
    }
  }

  /**
   * Parse post details from content-queue.md
   */
  parsePostsFromQueue(content, dayName) {
    const posts = []

    // This is a simplified parser; in production, consider using a markdown parser
    const sections = content.split('### ')
    for (const section of sections) {
      if (section.includes(dayName)) {
        const typeMatch = section.match(/Type:\s*(\w+)/i)
        const captionMatch = section.match(/Caption:\s*"([^"]+)"/i)
        const statusMatch = section.match(/Status:\s*(\w+)/i)

        if (typeMatch && captionMatch) {
          posts.push({
            type: typeMatch[1].toLowerCase(),
            caption: captionMatch[1],
            status: statusMatch ? statusMatch[1] : 'pending',
            day: dayName,
          })
        }
      }
    }

    return posts
  }

  /**
   * Render a trading card via /render/card endpoint
   */
  async renderCard(params = {}) {
    try {
      const queryString = new URLSearchParams({
        playerName: params.playerName || 'Sample Player',
        clubName: params.clubName || 'Sample Club',
        style: params.style || 'classic',
        stats: params.stats || 'Wins:10|Goals:25|Assists:15',
        ...params,
      }).toString()

      const response = await fetch(`${API_BASE_URL}/render/card?${queryString}`)

      if (!response.ok) {
        throw new Error(`Render API returned ${response.status}`)
      }

      // Get the image as buffer
      return await response.buffer()
    } catch (error) {
      logger.error(AGENT_NAME, 'Failed to render card', {
        error: error.message,
      })
      throw error
    }
  }

  /**
   * Upload image to Meta and get media ID
   */
  async uploadImageToMeta(imageBuffer, accountId, isReel = false) {
    try {
      const formData = new FormData()
      const blob = new Blob([imageBuffer], { type: 'image/png' })
      formData.append('image', blob, 'card.png')

      const endpoint = isReel
        ? `https://graph.instagram.com/v18.0/${accountId}/media`
        : `https://graph.instagram.com/v18.0/${accountId}/media`

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${META_ACCESS_TOKEN}`,
        },
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(
          `Meta API error: ${error.error?.message || response.statusText}`
        )
      }

      const data = await response.json()
      return data.id
    } catch (error) {
      logger.error(AGENT_NAME, 'Failed to upload image to Meta', {
        error: error.message,
      })
      throw error
    }
  }

  /**
   * Create carousel post (multiple images)
   */
  async createCarouselPost(imageIds, caption) {
    try {
      const mediaItems = imageIds.map((id) => ({ media_id: id }))

      const response = await fetch(
        `https://graph.instagram.com/v18.0/${META_IG_BUSINESS_ACCOUNT_ID}/media`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${META_ACCESS_TOKEN}`,
          },
          body: JSON.stringify({
            media_type: 'CAROUSEL',
            children: mediaItems,
            caption: caption,
          }),
        }
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(
          `Meta API error: ${error.error?.message || response.statusText}`
        )
      }

      const data = await response.json()
      logger.info(AGENT_NAME, 'Created carousel post', { mediaId: data.id })
      return data.id
    } catch (error) {
      logger.error(AGENT_NAME, 'Failed to create carousel post', {
        error: error.message,
      })
      throw error
    }
  }

  /**
   * Create single image post
   */
  async createImagePost(imageId, caption) {
    try {
      const response = await fetch(
        `https://graph.instagram.com/v18.0/${META_IG_BUSINESS_ACCOUNT_ID}/media`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${META_ACCESS_TOKEN}`,
          },
          body: JSON.stringify({
            image_url: imageId,
            caption: caption,
          }),
        }
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(
          `Meta API error: ${error.error?.message || response.statusText}`
        )
      }

      const data = await response.json()
      logger.info(AGENT_NAME, 'Created image post', { mediaId: data.id })
      return data.id
    } catch (error) {
      logger.error(AGENT_NAME, 'Failed to create image post', {
        error: error.message,
      })
      throw error
    }
  }

  /**
   * Publish media to feed (after creation)
   */
  async publishMedia(mediaId) {
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

      const data = await response.json()
      logger.info(AGENT_NAME, 'Published media to feed', { mediaId })
      return data
    } catch (error) {
      logger.error(AGENT_NAME, 'Failed to publish media', {
        error: error.message,
      })
      throw error
    }
  }

  /**
   * Create Facebook page post
   */
  async createFacebookPost(message, link = null) {
    try {
      const postData = {
        message: message,
      }

      if (link) {
        postData.link = link
      }

      const response = await fetch(
        `https://graph.facebook.com/v18.0/${META_PAGE_ID}/feed`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${META_ACCESS_TOKEN}`,
          },
          body: JSON.stringify(postData),
        }
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(
          `Facebook API error: ${error.error?.message || response.statusText}`
        )
      }

      const data = await response.json()
      logger.info(AGENT_NAME, 'Created Facebook post', { postId: data.id })
      return data.id
    } catch (error) {
      logger.error(AGENT_NAME, 'Failed to create Facebook post', {
        error: error.message,
      })
      throw error
    }
  }

  /**
   * Main run function
   */
  async run() {
    logger.info(AGENT_NAME, 'Starting Meta Publisher agent')

    try {
      const posts = this.getScheduledPosts()

      if (posts.length === 0) {
        logger.info(AGENT_NAME, 'No posts to publish today')
        return
      }

      for (const post of posts) {
        try {
          logger.info(AGENT_NAME, `Publishing ${post.type} post`, {
            caption: post.caption.substring(0, 50),
          })

          if (post.type === 'carousel') {
            // Render 4 card styles
            const styles = ['classic', 'premium_gold', 'team_blue', 'holographic']
            const imageIds = []

            for (const style of styles) {
              const cardBuffer = await this.renderCard({
                style: style,
                playerName: 'Sample Player',
              })
              const mediaId = await this.uploadImageToMeta(cardBuffer, META_IG_BUSINESS_ACCOUNT_ID)
              imageIds.push(mediaId)
            }

            await this.createCarouselPost(imageIds, post.caption)
          } else if (post.type === 'single card image') {
            const cardBuffer = await this.renderCard({
              style: 'classic',
              playerName: 'Sample Player',
            })
            const mediaId = await this.uploadImageToMeta(cardBuffer, META_IG_BUSINESS_ACCOUNT_ID)
            await this.createImagePost(mediaId, post.caption)
          } else if (post.type === 'blog link') {
            const cardBuffer = await this.renderCard({
              style: 'classic',
              playerName: 'Sample Player',
            })
            const mediaId = await this.uploadImageToMeta(cardBuffer, META_IG_BUSINESS_ACCOUNT_ID)
            await this.createImagePost(mediaId, post.caption)
          }

          logger.info(AGENT_NAME, 'Successfully published post', {
            type: post.type,
          })
        } catch (error) {
          logger.error(AGENT_NAME, 'Failed to publish individual post', {
            type: post.type,
            error: error.message,
          })
          // Continue with next post instead of failing entire run
        }
      }

      logger.info(AGENT_NAME, 'Meta Publisher agent completed successfully')
    } catch (error) {
      logger.error(AGENT_NAME, 'Meta Publisher agent failed', {
        error: error.message,
      })
      process.exit(1)
    }
  }
}

// Run the agent
const publisher = new MetaPublisher()
await publisher.run()
