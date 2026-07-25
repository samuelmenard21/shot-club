#!/bin/bash

# Setup Mailchimp Email Sequences
# This script provides instructions for manually setting up email automation sequences in Mailchimp
#
# Prerequisites:
# - Mailchimp account with a configured audience
# - MAILCHIMP_API_KEY and MAILCHIMP_AUDIENCE_ID environment variables set
# - blog_subscribers table synced to Mailchimp

set -e

echo "========================================="
echo "Mailchimp Email Sequences Setup"
echo "========================================="
echo ""
echo "This script will guide you through setting up 3 email automation sequences."
echo "Note: Email sequence creation via API is limited; most setup is manual in Mailchimp UI."
echo ""

# Check environment variables
if [ -z "$MAILCHIMP_API_KEY" ]; then
  echo "ERROR: MAILCHIMP_API_KEY environment variable not set"
  exit 1
fi

if [ -z "$MAILCHIMP_AUDIENCE_ID" ]; then
  echo "ERROR: MAILCHIMP_AUDIENCE_ID environment variable not set"
  exit 1
fi

# Extract server prefix from API key
SERVER=$(echo "$MAILCHIMP_API_KEY" | cut -d'-' -f2)
MAILCHIMP_URL="https://${SERVER}.admin.mailchimp.com"

echo "Server: $SERVER"
echo "Audience ID: $MAILCHIMP_AUDIENCE_ID"
echo ""
echo "========================================="
echo ""

# Sequence 1: New Blog Subscriber
echo "SEQUENCE 1: New Blog Subscriber"
echo "==============================="
echo ""
echo "1. Log in to Mailchimp: $MAILCHIMP_URL"
echo "2. Go to Audience > ${MAILCHIMP_AUDIENCE_ID} > Automations"
echo "3. Click 'Create Automation' > 'Automation'"
echo "4. Choose trigger: 'Contact added to list'"
echo "5. Set up the following emails:"
echo ""
echo "   Email 1 (Day 0):"
echo "   - Subject: 'Welcome to Pull My Card — Your Free Styles Guide Inside'"
echo "   - Body: Welcome email + link to free styles guide PDF"
echo "   - CTA: 'Download Your Styles Guide'"
echo ""
echo "   Email 2 (Day 3):"
echo "   - Subject: 'See How [Player Name] Shared Their Card With Family'"
echo "   - Body: Guide on how to share trading cards with family + testimonial"
echo "   - CTA: 'Read the Story'"
echo ""
echo "   Email 3 (Day 7):"
echo "   - Subject: 'Unlock Premium Styles — Your Team Plan Awaits'"
echo "   - Body: Premium styles feature overview + team plan benefits"
echo "   - CTA: 'Explore Team Plans' > /fundraising"
echo ""
echo "   Email 4 (Day 14):"
echo "   - Subject: '[CASE STUDY] How 3 Local Teams Raised \$5K This Season'"
echo "   - Body: Real case study of sponsorship model + local butcher highlights"
echo "   - CTA: 'Start Your Fundraiser'"
echo ""
echo ""

# Sequence 2: Sponsor Outreach
echo "SEQUENCE 2: Sponsor Interest (from Outreach)"
echo "============================================="
echo ""
echo "1. In Mailchimp, create new automation with trigger: 'Tag added'"
echo "2. Set trigger tag: 'sponsor_outreach'"
echo "3. (This tag is applied by outreach-drafter agent)"
echo "4. Set up the following emails:"
echo ""
echo "   Email 1 (Day 0):"
echo "   - Subject: 'Your Premium Meat Pack Fundraiser Kit'"
echo "   - Body: Sponsor program overview + case study"
echo "   - CTA: 'View Success Stories'"
echo ""
echo "   Email 2 (Day 3):"
echo "   - Subject: '3 Local Shops Sponsor Youth Teams — Yours Could Be Next'"
echo "   - Body: Sponsor success stories + butcher testimonials"
echo "   - CTA: 'See How It Works'"
echo ""
echo "   Email 3 (Day 7):"
echo "   - Subject: 'Launch Your Fundraiser This Fall [FAQ Inside]'"
echo "   - Body: FAQ document + timeline for setup"
echo "   - CTA: 'Download FAQ'"
echo ""
echo "   Email 4 (Day 14):"
echo "   - Subject: 'Ready to Sponsor? Let\'s Make It Official'"
echo "   - Body: Call-to-action to schedule call + offer summary"
echo "   - CTA: 'Schedule a Call' > calendly link"
echo ""
echo ""

# Sequence 3: Blog Visitor
echo "SEQUENCE 3: Blog Visitor (from Pinterest/Organic)"
echo "==================================================="
echo ""
echo "1. In Mailchimp, create new automation with trigger: 'Tag added'"
echo "2. Set trigger tag: 'blog_visitor'"
echo "3. Set up the following emails:"
echo ""
echo "   Email 1 (Day 0):"
echo "   - Subject: 'Enjoyed \"[Blog Title]\"? Here\'s What\'s Next'"
echo "   - Body: Reference the blog post + suggest 2-3 related posts"
echo "   - CTA: 'Read Related Posts' > /blog"
echo ""
echo "   Email 2 (Day 3):"
echo "   - Subject: 'Try Making Your Own Trading Card (It\'s Easier Than You Think)'"
echo "   - Body: Step-by-step guide to creating first card + benefits"
echo "   - CTA: 'Create Your First Card' > /login"
echo ""
echo "   Email 3 (Day 7):"
echo "   - Subject: 'Families Love Sharing Cards — Here\'s How'"
echo "   - Body: Customer testimonials + community highlights"
echo "   - CTA: 'Join the Community' > /club"
echo ""
echo "   Email 4 (Day 14):"
echo "   - Subject: 'Teams Are Fundraising Differently This Year'"
echo "   - Body: Fundraising model overview + team success stories"
echo "   - CTA: 'Learn About Team Fundraising' > /fundraising"
echo ""
echo ""

# Email content templates
echo "========================================="
echo "EMAIL TEMPLATES (Copy/Paste Ready)"
echo "========================================="
echo ""

echo "SEQUENCE 1, EMAIL 1: Welcome Email"
echo "===================================="
cat << 'EOF'
Subject: Welcome to Pull My Card — Your Free Styles Guide Inside

Hi *|FNAME|*,

Thanks for joining the Pull My Card community! We're building something special for hockey families.

Your trading cards are more than collectibles — they're memories. And every memory deserves to be shared and celebrated.

Download your free guide to all 8 card styles (each tells a different story):

[DOWNLOAD BUTTON: Your Free Styles Guide]

Got questions? Reply to this email anytime — we read every message.

—
Pull My Card
Collect. Share. Celebrate.
EOF
echo ""

echo "SEQUENCE 1, EMAIL 2: Share with Family"
echo "========================================"
cat << 'EOF'
Subject: See How [Player Name] Shared Their Card With Family

Hi *|FNAME|*,

Last week, Sarah from Toronto shared her daughter's card with the whole family at dinner.

Here's what she told us: *"My mom, sister, grandparents... everyone got a card. It sparked this whole conversation about hockey, achievement, family pride. It's on their fridge now."*

Sharing your card takes 30 seconds:
1. Open your card
2. Tap Share
3. Text, email, or print

[READ THE FULL STORY]

That moment? That's why we built this.

—
Pull My Card
EOF
echo ""

echo "SEQUENCE 2, EMAIL 1: Sponsor Intro"
echo "=================================="
cat << 'EOF'
Subject: Your Premium Meat Pack Fundraiser Kit

Hi *|FNAME|*,

Teams across Ontario just discovered a way to fundraise that actually resonates with families.

Premium meat packs. Local butchers. Trading card partnerships.

Here's the model:
- Your club partners with a local butcher
- Families buy premium meat packs (10-20% discount)
- Butcher gets brand exposure to 40+ hockey families
- Your team keeps $1,200-$1,800 per fundraiser
- Every player's trading card features the sponsor's story

Result? $5K+ per season. Brand exposure for the butcher. Premium product for families.

[SEE SUCCESS STORIES]

—
Pull My Card
EOF
echo ""

echo "========================================="
echo "Next Steps:"
echo "========================================="
echo ""
echo "1. Log in to Mailchimp and create the 3 automations above"
echo "2. Copy email templates and customize with your branding"
echo "3. Add tags to blog_subscribers table via outreach-drafter agent"
echo "4. Test each sequence with a test subscriber"
echo "5. Monitor open rates and clicks in Mailchimp dashboard"
echo ""
echo "Troubleshooting:"
echo "- Check mailchimp-sync agent logs: tail -f logs/mailchimp-sync-*.log"
echo "- Verify subscribers in Mailchimp audience"
echo "- Confirm tags are being applied correctly"
echo ""
echo "Questions? Email: samuelmenard@gmail.com"
echo ""
