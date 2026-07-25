#!/usr/bin/env node

/**
 * Mailchimp Sync Agent
 * Syncs blog subscribers from Supabase to Mailchimp
 * Runs: Daily 11 AM
 */

import { createClient } from '@supabase/supabase-js'
import MailchimpClient from '../src/lib/mailchimp/client.ts'
import logger from '../src/lib/logger.js'

const AGENT_NAME = 'mailchimp-sync'

// Supabase setup
const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY

class MailchimpSyncAgent {
  constructor() {
    this.validateEnv()
    this.supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    this.mailchimp = new MailchimpClient()
  }

  validateEnv() {
    if (!SUPABASE_URL) {
      throw new Error('SUPABASE_URL environment variable is required')
    }
    if (!SUPABASE_ANON_KEY) {
      throw new Error('SUPABASE_ANON_KEY environment variable is required')
    }
  }

  /**
   * Get unsync'd blog subscribers
   */
  async getUnsyncdSubscribers() {
    try {
      const { data, error } = await this.supabase
        .from('blog_subscribers')
        .select('id, email, name, source, interests')
        .is('mailchimp_synced_at', null)
        .eq('is_active', true)
        .limit(100)

      if (error) {
        throw new Error(`Supabase error: ${error.message}`)
      }

      logger.info(AGENT_NAME, 'Fetched unsync\'d subscribers', {
        count: data?.length || 0,
      })

      return data || []
    } catch (error) {
      logger.error(AGENT_NAME, 'Failed to fetch subscribers', {
        error: error.message,
      })
      throw error
    }
  }

  /**
   * Sync individual subscriber to Mailchimp
   */
  async syncSubscriber(subscriber) {
    try {
      // Parse interests as tags
      const tags = Array.isArray(subscriber.interests)
        ? subscriber.interests
        : JSON.parse(subscriber.interests || '[]')

      // Sync to Mailchimp
      const result = await this.mailchimp.syncContact(
        subscriber.email,
        subscriber.name,
        subscriber.source || 'blog',
        tags
      )

      logger.info(AGENT_NAME, 'Synced subscriber to Mailchimp', {
        email: subscriber.email,
        mailchimpId: result.id,
      })

      // Update Supabase with sync timestamp and contact ID
      await this.supabase
        .from('blog_subscribers')
        .update({
          mailchimp_synced_at: new Date().toISOString(),
          mailchimp_contact_id: result.id,
        })
        .eq('id', subscriber.id)

      return true
    } catch (error) {
      logger.error(AGENT_NAME, 'Failed to sync subscriber', {
        email: subscriber.email,
        error: error.message,
      })

      // Continue with next subscriber even if one fails
      return false
    }
  }

  /**
   * Main run function
   */
  async run() {
    logger.info(AGENT_NAME, 'Starting Mailchimp Sync agent')

    try {
      const subscribers = await this.getUnsyncdSubscribers()

      if (subscribers.length === 0) {
        logger.info(AGENT_NAME, 'No new subscribers to sync')
        return
      }

      let successCount = 0
      let failureCount = 0

      for (const subscriber of subscribers) {
        const success = await this.syncSubscriber(subscriber)
        if (success) {
          successCount++
        } else {
          failureCount++
        }
      }

      logger.info(AGENT_NAME, 'Mailchimp Sync agent completed', {
        synced: successCount,
        failed: failureCount,
        total: subscribers.length,
      })
    } catch (error) {
      logger.error(AGENT_NAME, 'Mailchimp Sync agent failed', {
        error: error.message,
      })
      process.exit(1)
    }
  }
}

// Run the agent
const syncAgent = new MailchimpSyncAgent()
await syncAgent.run()
