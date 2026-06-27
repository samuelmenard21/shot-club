import { useNavigate } from 'react-router-dom'
import { setSEO, CANONICAL_URL } from '../lib/seo'
import { useEffect } from 'react'

export default function PrivacyScreen() {
  const nav = useNavigate()
  useEffect(() => {
    setSEO({ title: 'Privacy Policy', url: `${CANONICAL_URL}/privacy` })
  }, [])

  return (
    <div className="privacy-wrap">
      <div className="privacy-inner">
        <button className="privacy-back" onClick={() => nav(-1)}>← Back</button>
        <h1 className="privacy-title">Privacy Policy</h1>
        <p className="privacy-meta">Hockey Shot Challenge · Last updated June 27, 2026</p>

        <p>Hockey Shot Challenge ("we", "our", or "the app") is a shot-tracking app for hockey players. This policy explains what data we collect, how we use it, and your rights.</p>

        <h2>What we collect</h2>
        <ul>
          <li><strong>Account info:</strong> When you sign up with Google, we receive your Google account name and email address. We use your name to set your in-app display name. Your email is stored by our auth provider (Supabase) and is never shown publicly or shared.</li>
          <li><strong>Player profile:</strong> Your display name, first name, position (forward / defense / goalie), team, and age group.</li>
          <li><strong>Shot and drill logs:</strong> The number and type of shots or reps you log each day. Logs include a timestamp and count — no location or video is recorded.</li>
          <li><strong>Usage data:</strong> Supabase and Netlify may collect standard server logs (IP address, request timestamps) as part of hosting the service.</li>
        </ul>

        <h2>How we use your data</h2>
        <ul>
          <li>To power leaderboards, streaks, squad battles, and the coach dashboard</li>
          <li>To show your stats to your coach (if you joined a team)</li>
          <li>To generate your public player card (accessible via your username link)</li>
        </ul>
        <p>We do not sell your data. We do not use it for advertising. We do not share it with third parties beyond the infrastructure providers needed to run the app (Supabase for the database and auth, Netlify for hosting).</p>

        <h2>Children</h2>
        <p>Hockey Shot Challenge is used by players of all ages, including children under 13. We collect only the minimum data needed to run the app. Parents who sign up on behalf of their child control the account and can delete it at any time from Settings → Delete account.</p>

        <h2>Your rights</h2>
        <ul>
          <li><strong>View your data:</strong> All your data is visible inside the app.</li>
          <li><strong>Delete your account:</strong> Go to Settings (the More tab) → Delete account. This permanently removes all your shots, streak, rank, and player card. It cannot be undone.</li>
          <li><strong>Data portability:</strong> Contact us and we'll send you a copy of your data.</li>
        </ul>

        <h2>Data retention</h2>
        <p>Your data is kept as long as your account is active. When you delete your account, all associated shot logs, drill logs, achievements, and your player profile are permanently deleted.</p>

        <h2>Third-party services</h2>
        <ul>
          <li><strong>Supabase</strong> — database, authentication, and file storage. <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">Privacy policy ↗</a></li>
          <li><strong>Netlify</strong> — web hosting. <a href="https://www.netlify.com/privacy/" target="_blank" rel="noopener noreferrer">Privacy policy ↗</a></li>
          <li><strong>Google Sign-In</strong> — authentication only. We request your name and email address. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy policy ↗</a></li>
        </ul>

        <h2>Contact</h2>
        <p>Questions or requests? Email us at <a href="mailto:hello@hockeyshotchallenge.com">hello@hockeyshotchallenge.com</a>.</p>
      </div>

      <style>{styles}</style>
    </div>
  )
}

const styles = `
.privacy-wrap {
  min-height: 100dvh;
  background: var(--bg);
  color: var(--text);
  padding: 24px 20px 60px;
}
.privacy-inner {
  max-width: 680px;
  margin: 0 auto;
}
.privacy-back {
  color: var(--text-mute);
  font-size: 13px;
  margin-bottom: 24px;
  display: block;
  text-align: left;
}
.privacy-back:hover { color: var(--ice); }
.privacy-title {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 800;
  color: white;
  margin-bottom: 4px;
}
.privacy-meta {
  font-size: 12px;
  color: var(--text-mute);
  margin-bottom: 24px;
}
.privacy-inner p, .privacy-inner ul, .privacy-inner li {
  font-size: 15px;
  line-height: 1.65;
  color: var(--text-soft);
  margin-bottom: 14px;
}
.privacy-inner ul {
  padding-left: 20px;
}
.privacy-inner li { margin-bottom: 8px; }
.privacy-inner h2 {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  color: white;
  margin: 28px 0 10px;
  letter-spacing: 0.3px;
}
.privacy-inner strong { color: var(--text); }
.privacy-inner a { color: var(--ice); text-decoration: underline; }
`
