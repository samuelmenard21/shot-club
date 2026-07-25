#!/usr/bin/env node

/**
 * Outreach Drafter Agent
 * Generates personalized draft messages for hockey clubs
 * Targets associations for meat pack fundraiser outreach
 * Runs: Daily 8 AM
 */

import fs from 'fs'
import path from 'path'
import { createClient } from '@supabase/supabase-js'
import logger from '../src/lib/logger.js'

const AGENT_NAME = 'outreach-drafter'

// Supabase setup
const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY

// Estimated revenue per sponsorship
const ESTIMATED_REVENUE = 850

// Contact exclusion window in days
const CONTACT_EXCLUSION_DAYS = 30

class OutreachDrafter {
  constructor() {
    this.validateEnv()
    this.supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    this.queuePath = path.join(process.cwd(), 'outreach-queue.json')
    this.contactsPath = path.join(process.cwd(), 'outreach-contacts.json')
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
   * Load contact history
   */
  loadContactHistory() {
    if (!fs.existsSync(this.contactsPath)) {
      return []
    }

    try {
      const data = fs.readFileSync(this.contactsPath, 'utf-8')
      return JSON.parse(data)
    } catch (error) {
      logger.error(AGENT_NAME, 'Failed to load contact history', {
        error: error.message,
      })
      return []
    }
  }

  /**
   * Get recently contacted association IDs
   */
  getRecentlyContacted(contacts, days = CONTACT_EXCLUSION_DAYS) {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)

    return contacts
      .filter((record) => new Date(record.contactDate) > cutoffDate)
      .map((record) => record.associationId)
  }

  /**
   * Fetch hockey clubs from Supabase
   */
  async getHockeyClubs() {
    try {
      const contacts = this.loadContactHistory()
      const recentlyContacted = this.getRecentlyContacted(contacts)

      const { data, error } = await this.supabase
        .from('clubs')
        .select('id, name, city, province, contact_email, contact_name')
        .eq('governing_body', 'hockey')
        .eq('is_active', true)
        .limit(100)

      if (error) {
        throw new Error(`Supabase error: ${error.message}`)
      }

      // Filter out recently contacted clubs
      const clubs = (data || [])
        .filter((club) => !recentlyContacted.includes(club.id))
        .sort(() => Math.random() - 0.5) // Randomize
        .slice(0, 10) // Get 10 random clubs

      logger.info(AGENT_NAME, 'Fetched hockey clubs', {
        total: clubs.length,
        excluded: recentlyContacted.length,
      })

      return clubs
    } catch (error) {
      logger.error(AGENT_NAME, 'Failed to fetch hockey clubs', {
        error: error.message,
      })
      return []
    }
  }

  /**
   * Generate personalized message for club
   */
  generateMessage(club) {
    const coachName = club.contact_name || 'Coach'
    const clubName = club.name
    const contactEmail = club.contact_email || 'coach@example.com'

    const message = `Subject: ${clubName} — Premium Meat Pack Fundraiser for Your Team

Hi ${coachName},

We work with youth hockey teams to run premium meat pack fundraisers. Local butchers sponsor the packs, your team keeps 40%, and families get the sponsorship story on every trading card your players create.

${clubName} would get:
- $${ESTIMATED_REVENUE}-${ESTIMATED_REVENUE + 400} from local butcher sponsorship
- Trading cards for your whole team featuring butcher branding
- Direct reach to families who care about local food sourcing
- Fundraiser setup support (we handle the heavy lifting)

This is a proven model with hockey clubs across Ontario and Alberta. The butcher gets brand exposure to 40+ families, your team raises funds, and players get something unique to keep forever.

Interested? Reply to this message or call 905-555-0123. We can have everything set up for your fall season.

—
Pull My Card
The Trading Card Fundraiser for Youth Sports`

    return {
      clubName,
      coachName,
      email: contactEmail,
      message,
    }
  }

  /**
   * Save draft queue
   */
  saveDraftQueue(drafts) {
    try {
      const queue = {
        date: new Date().toISOString().split('T')[0],
        drafts: drafts,
      }

      fs.writeFileSync(this.queuePath, JSON.stringify(queue, null, 2), 'utf-8')
      logger.info(AGENT_NAME, 'Saved draft queue', { count: drafts.length })
    } catch (error) {
      logger.error(AGENT_NAME, 'Failed to save draft queue', {
        error: error.message,
      })
      throw error
    }
  }

  /**
   * Append to contact history
   */
  appendContactHistory(entries) {
    try {
      const contacts = this.loadContactHistory()
      const updated = [...contacts, ...entries]

      fs.writeFileSync(this.contactsPath, JSON.stringify(updated, null, 2), 'utf-8')
      logger.info(AGENT_NAME, 'Appended contact history', { count: entries.length })
    } catch (error) {
      logger.error(AGENT_NAME, 'Failed to append contact history', {
        error: error.message,
      })
      throw error
    }
  }

  /**
   * Main run function
   */
  async run() {
    logger.info(AGENT_NAME, 'Starting Outreach Drafter agent')

    try {
      // Fetch clubs
      const clubs = await this.getHockeyClubs()

      if (clubs.length === 0) {
        logger.info(AGENT_NAME, 'No new clubs to contact today')
        return
      }

      // Generate drafts
      const drafts = clubs.map((club) => {
        const draft = this.generateMessage(club)
        return {
          associationId: club.id,
          clubName: draft.clubName,
          contactName: draft.coachName,
          email: draft.email,
          message: draft.message,
          status: 'ready-to-send',
          sentDate: null,
        }
      })

      // Save drafts
      this.saveDraftQueue(drafts)

      // Log contact attempts
      const contactLog = clubs.map((club) => ({
        associationId: club.id,
        contactDate: new Date().toISOString().split('T')[0],
        status: 'drafted',
      }))

      this.appendContactHistory(contactLog)

      logger.info(AGENT_NAME, 'Outreach Drafter agent completed successfully', {
        draftsCreated: drafts.length,
      })
    } catch (error) {
      logger.error(AGENT_NAME, 'Outreach Drafter agent failed', {
        error: error.message,
      })
      process.exit(1)
    }
  }
}

// Run the agent
const drafter = new OutreachDrafter()
await drafter.run()
