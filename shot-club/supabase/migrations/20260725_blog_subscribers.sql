-- Create blog_subscribers table for Mailchimp integration
CREATE TABLE IF NOT EXISTS blog_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  source TEXT DEFAULT 'blog', -- 'blog', 'pinterest', 'organic', etc.
  interests JSONB DEFAULT '[]'::jsonb, -- ['card_buyer', 'sponsor', 'coach']
  mailchimp_contact_id TEXT, -- ID from Mailchimp API
  mailchimp_synced_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  is_active BOOLEAN DEFAULT true
);

-- Create index for email lookup
CREATE INDEX idx_blog_subscribers_email ON blog_subscribers(email);
CREATE INDEX idx_blog_subscribers_mailchimp_synced ON blog_subscribers(mailchimp_synced_at);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_blog_subscribers_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER blog_subscribers_updated_at_trigger
BEFORE UPDATE ON blog_subscribers
FOR EACH ROW
EXECUTE FUNCTION update_blog_subscribers_updated_at();

-- Create table to track outreach contacts for deduplication
CREATE TABLE IF NOT EXISTS outreach_contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  association_id TEXT NOT NULL,
  contact_date TIMESTAMP DEFAULT now(),
  status TEXT DEFAULT 'drafted', -- 'drafted', 'sent', 'replied', 'bounced'
  notes TEXT
);

-- Create index for association lookup
CREATE INDEX idx_outreach_contacts_association ON outreach_contacts(association_id);
CREATE INDEX idx_outreach_contacts_contact_date ON outreach_contacts(contact_date);
