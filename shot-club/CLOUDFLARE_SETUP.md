# Cloudflare Pages Setup Guide

## Environment Variables Configuration

To enable Google OAuth and Supabase functionality on Cloudflare Pages, you need to configure environment variables.

### Steps to Configure:

1. **Go to Cloudflare Pages Dashboard**
   - Navigate to your "shot-club" project
   - Click "Settings"

2. **Add Environment Variables**
   - Click "Environment variables"
   - Under "Production", add these variables:

   **Variable 1:**
   - Name: `VITE_SUPABASE_URL`
   - Value: `https://[YOUR_PROJECT_ID].supabase.co` (Get from Supabase dashboard → Settings → API)

   **Variable 2:**
   - Name: `VITE_SUPABASE_ANON_KEY`
   - Value: `[YOUR_ANON_KEY]` (Get from Supabase dashboard → Settings → API → Project URL / Anon key)

3. **Trigger Redeployment**
   - After adding environment variables, Cloudflare will automatically redeploy
   - Or manually trigger a redeploy by going to "Deployments" and redeploying the latest commit

### Where to Find Supabase Credentials:

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Select your project
3. Go to **Settings** (gear icon) → **API**
4. Copy:
   - **Project URL** → Use as `VITE_SUPABASE_URL`
   - **Project API keys** → Copy the "anon public" key → Use as `VITE_SUPABASE_ANON_KEY`

### Verify Setup:

After deploying with environment variables:
1. Visit https://hockeyshotchallenge.com
2. Click "Sign in" or "Continue with Google"
3. You should be able to complete the Google OAuth flow

## Troubleshooting

**If you still see the placeholder.supabase.co error:**
- Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
- Wait 2-3 minutes for the deployment to fully propagate
- Check that environment variables are set in the "Production" environment (not just Preview)

**If Google OAuth still doesn't work:**
- Verify the Supabase project has Google OAuth configured
- Check that the redirect URL is set to `https://hockeyshotchallenge.com` in Supabase
