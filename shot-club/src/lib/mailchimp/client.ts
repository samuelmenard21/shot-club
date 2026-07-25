/**
 * Mailchimp API Client
 * Handles email list management and contact syncing
 */

interface MailchimpContact {
  email_address: string
  status: 'subscribed' | 'unsubscribed' | 'cleaned' | 'pending'
  merge_fields?: {
    FNAME?: string
    LNAME?: string
    SOURCE?: string
  }
  tags?: string[]
}

interface MailchimpResponse {
  id?: string
  email_address?: string
  status?: string
  error?: number
  title?: string
  detail?: string
}

interface MailchimpListResponse {
  members?: MailchimpResponse[]
  error?: number
  title?: string
  detail?: string
}

class MailchimpClient {
  private apiKey: string
  private audienceId: string
  private serverPrefix: string
  private baseUrl: string

  constructor(apiKey?: string, audienceId?: string) {
    this.apiKey = apiKey || process.env.MAILCHIMP_API_KEY || ''
    this.audienceId = audienceId || process.env.MAILCHIMP_AUDIENCE_ID || ''

    if (!this.apiKey) {
      throw new Error('MAILCHIMP_API_KEY environment variable is required')
    }

    if (!this.audienceId) {
      throw new Error('MAILCHIMP_AUDIENCE_ID environment variable is required')
    }

    // Extract server prefix from API key (e.g., "us1" from "key-us1")
    this.serverPrefix = this.apiKey.split('-')[1] || 'us1'
    this.baseUrl = `https://${this.serverPrefix}.api.mailchimp.com/3.0`
  }

  /**
   * Create or update a contact in Mailchimp
   */
  async syncContact(
    email: string,
    firstName?: string,
    source: string = 'blog',
    tags: string[] = []
  ): Promise<MailchimpResponse> {
    if (!email || !this.isValidEmail(email)) {
      throw new Error(`Invalid email address: ${email}`)
    }

    const contactData: MailchimpContact = {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName || '',
        SOURCE: source,
      },
      tags: tags.length > 0 ? tags : ['blog_subscriber'],
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/lists/${this.audienceId}/members`,
        {
          method: 'POST',
          headers: {
            Authorization: `Basic ${Buffer.from(`anystring:${this.apiKey}`).toString('base64')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(contactData),
        }
      )

      const data: MailchimpResponse = await response.json()

      if (!response.ok) {
        // If contact already exists, update instead (409 = conflict)
        if (response.status === 400 && (data as any)?.title?.includes('Member Exists')) {
          return this.updateContact(email, firstName, source, tags)
        }

        throw new Error(
          `Mailchimp API error: ${data.title || data.detail || response.statusText}`
        )
      }

      return data
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to sync contact: ${error.message}`)
      }
      throw error
    }
  }

  /**
   * Update an existing contact
   */
  async updateContact(
    email: string,
    firstName?: string,
    source: string = 'blog',
    tags: string[] = []
  ): Promise<MailchimpResponse> {
    if (!email || !this.isValidEmail(email)) {
      throw new Error(`Invalid email address: ${email}`)
    }

    const emailHash = this.md5(email.toLowerCase())
    const contactData: MailchimpContact = {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName || '',
        SOURCE: source,
      },
      tags: tags.length > 0 ? tags : ['blog_subscriber'],
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/lists/${this.audienceId}/members/${emailHash}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Basic ${Buffer.from(`anystring:${this.apiKey}`).toString('base64')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(contactData),
        }
      )

      const data: MailchimpResponse = await response.json()

      if (!response.ok) {
        throw new Error(
          `Mailchimp API error: ${data.title || data.detail || response.statusText}`
        )
      }

      return data
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to update contact: ${error.message}`)
      }
      throw error
    }
  }

  /**
   * Add tags to an existing contact
   */
  async addTags(email: string, tags: string[]): Promise<MailchimpResponse> {
    if (!email || !this.isValidEmail(email)) {
      throw new Error(`Invalid email address: ${email}`)
    }

    if (tags.length === 0) {
      return { email_address: email, status: 'subscribed' }
    }

    const emailHash = this.md5(email.toLowerCase())
    const tagData = {
      tags: tags.map((tag) => ({ name: tag, status: 'active' })),
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/lists/${this.audienceId}/members/${emailHash}/tags`,
        {
          method: 'POST',
          headers: {
            Authorization: `Basic ${Buffer.from(`anystring:${this.apiKey}`).toString('base64')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(tagData),
        }
      )

      if (!response.ok) {
        const data = (await response.json()) as MailchimpResponse
        throw new Error(
          `Mailchimp API error: ${data.title || data.detail || response.statusText}`
        )
      }

      return { email_address: email, status: 'subscribed' }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to add tags: ${error.message}`)
      }
      throw error
    }
  }

  /**
   * Get a contact by email
   */
  async getContact(email: string): Promise<MailchimpResponse | null> {
    if (!email || !this.isValidEmail(email)) {
      throw new Error(`Invalid email address: ${email}`)
    }

    const emailHash = this.md5(email.toLowerCase())

    try {
      const response = await fetch(
        `${this.baseUrl}/lists/${this.audienceId}/members/${emailHash}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Basic ${Buffer.from(`anystring:${this.apiKey}`).toString('base64')}`,
          },
        }
      )

      if (response.status === 404) {
        return null
      }

      const data: MailchimpResponse = await response.json()

      if (!response.ok) {
        throw new Error(
          `Mailchimp API error: ${data.title || data.detail || response.statusText}`
        )
      }

      return data
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get contact: ${error.message}`)
      }
      throw error
    }
  }

  /**
   * Delete a contact from the list
   */
  async deleteContact(email: string): Promise<void> {
    if (!email || !this.isValidEmail(email)) {
      throw new Error(`Invalid email address: ${email}`)
    }

    const emailHash = this.md5(email.toLowerCase())

    try {
      const response = await fetch(
        `${this.baseUrl}/lists/${this.audienceId}/members/${emailHash}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Basic ${Buffer.from(`anystring:${this.apiKey}`).toString('base64')}`,
          },
        }
      )

      if (!response.ok && response.status !== 404) {
        const data = (await response.json()) as MailchimpResponse
        throw new Error(
          `Mailchimp API error: ${data.title || data.detail || response.statusText}`
        )
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to delete contact: ${error.message}`)
      }
      throw error
    }
  }

  /**
   * Batch sync contacts (more efficient for large lists)
   */
  async batchSyncContacts(
    contacts: Array<{
      email: string
      firstName?: string
      source?: string
      tags?: string[]
    }>
  ): Promise<MailchimpListResponse> {
    if (contacts.length === 0) {
      return { members: [] }
    }

    const operations = contacts.map((contact) => ({
      email_address: contact.email,
      status: 'subscribed',
      merge_fields: {
        FNAME: contact.firstName || '',
        SOURCE: contact.source || 'batch_import',
      },
      tags: contact.tags || ['blog_subscriber'],
    }))

    try {
      const response = await fetch(
        `${this.baseUrl}/lists/${this.audienceId}/members`,
        {
          method: 'POST',
          headers: {
            Authorization: `Basic ${Buffer.from(`anystring:${this.apiKey}`).toString('base64')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ operations }),
        }
      )

      const data: MailchimpListResponse = await response.json()

      if (!response.ok) {
        throw new Error(
          `Mailchimp API error: ${data.title || data.detail || response.statusText}`
        )
      }

      return data
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to batch sync contacts: ${error.message}`)
      }
      throw error
    }
  }

  /**
   * Validate email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  /**
   * MD5 hash for email (Mailchimp requirement)
   * Note: In production, use a proper md5 library
   */
  private md5(str: string): string {
    // This is a simple implementation. For production, use 'crypto' module
    if (typeof require !== 'undefined') {
      try {
        const crypto = require('crypto')
        return crypto.createHash('md5').update(str).digest('hex')
      } catch {
        // Fallback if crypto not available
      }
    }

    // Browser/Node fallback (not cryptographically safe for production)
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash
    }
    return Math.abs(hash).toString(16)
  }
}

export default MailchimpClient
export { MailchimpContact, MailchimpResponse }
