import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setSEO, addStructuredData, CANONICAL_URL } from '../lib/seo'

export default function ProvinceWideChallengeScreen() {
  const nav = useNavigate()

  useEffect(() => {
    setSEO({
      title: 'Province-Wide Hockey Challenge Platform — For Leagues & Associations',
      description: 'Run your province-wide 5K or 10K challenge digitally. Live leaderboards, real-time tracking, 300+ associations. Free platform for OMHA, OWHA, and regional hockey organizations.',
      url: `${CANONICAL_URL}/province-wide-challenge`,
    })
    addStructuredData({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Province-Wide Challenge Platform',
      description: 'Digital platform for managing province-wide hockey challenges across multiple associations.',
      url: `${CANONICAL_URL}/province-wide-challenge`,
    })
  }, [])

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-body)' }}>
      {/* NAV */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <button
          style={{ fontSize: 18, fontWeight: 700, background: 'transparent', cursor: 'pointer', color: 'white', border: 'none' }}
          onClick={() => nav('/')}
        >
          🏒 Hockey Shot Challenge
        </button>
        <button
          style={{ background: 'var(--accent)', color: 'white', padding: '10px 20px', borderRadius: 8, fontWeight: 700, cursor: 'pointer', border: 'none' }}
          onClick={() => window.location.href = 'mailto:samuelmenard@gmail.com?subject=Province-Wide Challenge Partnership'}
        >
          Let's Talk →
        </button>
      </nav>

      {/* HERO */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '80px 20px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: 'var(--accent)', marginBottom: 16 }}>
          FOR OMHA, OWHA & REGIONAL ORGANIZATIONS
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 8vw, 60px)', fontWeight: 800, color: 'white', lineHeight: 1.1, marginBottom: 24 }}>
          Digitize Your Province-Wide Challenge
        </h1>
        <p style={{ fontSize: 20, color: 'var(--text-soft)', marginBottom: 32, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
          300+ member associations. One platform. Real-time tracking across your entire province. No more PDF sheets. No more manual updates.
        </p>

        <button
          onClick={() => window.location.href = 'mailto:samuelmenard@gmail.com?subject=Province-Wide Challenge Partnership - OMHA/OWHA'}
          style={{
            background: 'var(--accent)',
            color: 'white',
            border: 'none',
            borderRadius: 10,
            padding: '16px 32px',
            fontWeight: 700,
            fontFamily: 'var(--font-display)',
            fontSize: 18,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 12px 24px rgba(41, 121, 255, 0.4)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          Schedule a Demo
        </button>
      </section>

      {/* THE PROBLEM */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 20px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 6vw, 42px)', fontWeight: 800, color: 'white', marginBottom: 40, textAlign: 'center' }}>
          The Problem With PDF Sheets at Scale
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
          {[
            { icon: '📋', title: 'Manual Tracking', desc: '300+ associations manually entering shot counts' },
            { icon: '⏱️', title: 'Days Behind', desc: 'Leaderboards update weekly, not in real-time' },
            { icon: '📞', title: 'Tons of Admin', desc: 'Constant emails asking for updates and counts' },
            { icon: '📉', title: 'Low Engagement', desc: 'Kids don\'t see live competition — motivation drops' },
            { icon: '❌', title: 'No Visibility', desc: 'Can\'t track province-wide trends or participation' },
            { icon: '💾', title: 'Data Silos', desc: 'All shot data scattered across 300 PDFs' },
          ].map((item, idx) => (
            <div key={idx} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
              <h3 style={{ fontWeight: 700, marginBottom: 8 }}>{item.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--text-soft)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* THE SOLUTION */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 20px', background: 'rgba(61, 214, 140, 0.05)', borderRadius: 16, marginBottom: 40 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 6vw, 42px)', fontWeight: 800, color: 'white', marginBottom: 40, textAlign: 'center' }}>
          The Modern Way
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {[
            {
              icon: '⚡',
              title: 'Instant Updates',
              desc: 'Players log shots instantly. Province-wide leaderboard updates live. No delays.',
            },
            {
              icon: '🏆',
              title: 'Province-Wide Leaderboard',
              desc: 'See top players, top associations, regional standings — all in one place.',
            },
            {
              icon: '📊',
              title: 'Real Competition',
              desc: 'Kids see live rankings across your entire province. Engagement skyrockets.',
            },
            {
              icon: '🚀',
              title: 'Zero Admin',
              desc: 'Families sign up once. Players log shots. Everything syncs automatically.',
            },
            {
              icon: '📱',
              title: 'Mobile-First',
              desc: 'Web app works on any phone. No download needed. Takes 5 seconds to log.',
            },
            {
              icon: '📈',
              title: 'Full Visibility',
              desc: 'See participation rates, shot counts, trends across your entire organization.',
            },
          ].map((item, idx) => (
            <div key={idx} style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 12, padding: 24, border: '1px solid rgba(61, 214, 140, 0.2)' }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{item.icon}</div>
              <h3 style={{ fontWeight: 700, marginBottom: 8 }}>{item.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--text-soft)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 20px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 6vw, 42px)', fontWeight: 800, color: 'white', marginBottom: 40, textAlign: 'center' }}>
          How It Works (3 Steps)
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {[
            {
              num: '1',
              title: 'You Pick Your Challenge',
              desc: 'Choose a 5K or 10K challenge (or custom goal). We set the framework and rules.',
            },
            {
              num: '2',
              title: 'Associations Join',
              desc: 'Send member associations a link. They create a branded leaderboard for their players.',
            },
            {
              num: '3',
              title: 'Players Compete',
              desc: 'Players log shots. Live leaderboards show their progress. You see real-time province-wide data.',
            },
          ].map((item, idx) => (
            <div key={idx} style={{ textAlign: 'center' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 60,
                  height: 60,
                  background: 'var(--accent)',
                  color: 'white',
                  borderRadius: '50%',
                  fontWeight: 800,
                  fontSize: 28,
                  marginBottom: 16,
                }}
              >
                {item.num}
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 8, fontSize: 18 }}>
                {item.title}
              </h3>
              <p style={{ fontSize: 14, color: 'var(--text-soft)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NUMBERS */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 20px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 6vw, 42px)', fontWeight: 800, color: 'white', marginBottom: 40 }}>
          Your Scale
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
          {[
            { number: '300+', label: 'Member Associations' },
            { number: '50K+', label: 'Active Players' },
            { number: '1M+', label: 'Shots Logged in Summer' },
            { number: '100%', label: 'Free for Your Members' },
          ].map((item, idx) => (
            <div key={idx} style={{ background: 'rgba(61, 214, 140, 0.1)', borderRadius: 12, padding: 24, border: '1px solid rgba(61, 214, 140, 0.3)' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--accent)', marginBottom: 8 }}>
                {item.number}
              </div>
              <div style={{ fontSize: 14, color: 'var(--text-soft)' }}>{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES TABLE */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 20px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 6vw, 42px)', fontWeight: 800, color: 'white', marginBottom: 40, textAlign: 'center' }}>
          What's Included
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.2)' }}>
                <th style={{ textAlign: 'left', padding: '16px 12px', fontWeight: 700, color: 'var(--accent)' }}>Feature</th>
                <th style={{ textAlign: 'center', padding: '16px 12px', fontWeight: 700, color: 'var(--accent)' }}>PDF Sheets</th>
                <th style={{ textAlign: 'center', padding: '16px 12px', fontWeight: 700, color: 'var(--accent)' }}>Hockey Shot Challenge</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Live Leaderboards', '❌', '✅'],
                ['Real-Time Updates', '❌', '✅'],
                ['Province-Wide Dashboard', '❌', '✅'],
                ['Association-Level Tracking', '⚠️', '✅'],
                ['Mobile App (No Download)', '❌', '✅'],
                ['Automated Data Collection', '❌', '✅'],
                ['Participation Analytics', '❌', '✅'],
                ['Zero Admin Work', '❌', '✅'],
                ['Completely Free', '✅', '✅'],
              ].map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <td style={{ padding: '12px', fontSize: 14 }}>{row[0]}</td>
                  <td style={{ padding: '12px', textAlign: 'center', fontSize: 16 }}>{row[1]}</td>
                  <td style={{ padding: '12px', textAlign: 'center', fontSize: 16, color: 'var(--accent)' }}>{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* PRICING */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 20px', textAlign: 'center', background: 'rgba(41, 121, 255, 0.05)', borderRadius: 16, marginBottom: 40 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 6vw, 42px)', fontWeight: 800, color: 'white', marginBottom: 16 }}>
          Completely Free
        </h2>
        <p style={{ fontSize: 16, color: 'var(--text-soft)', marginBottom: 24, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
          No setup fees. No per-association costs. No per-player fees. No transaction fees. This is completely free for OMHA, OWHA, and all your member associations and families.
        </p>
        <div style={{ fontSize: 14, color: 'var(--text-mute)' }}>
          We grow by making hockey better for everyone. Your success is our success.
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 20px', textAlign: 'center', background: 'rgba(61, 214, 140, 0.05)', borderRadius: 16, marginBottom: 60 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 6vw, 42px)', fontWeight: 800, color: 'white', marginBottom: 16 }}>
          Ready to Modernize Your Challenge?
        </h2>
        <p style={{ fontSize: 16, color: 'var(--text-soft)', marginBottom: 32, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
          Let's talk about bringing live tracking and real-time leaderboards to your entire province.
        </p>
        <button
          onClick={() => window.location.href = 'mailto:samuelmenard@gmail.com?subject=Province-Wide Challenge Partnership - Schedule Demo'}
          style={{
            background: 'var(--accent)',
            color: 'white',
            border: 'none',
            borderRadius: 10,
            padding: '16px 32px',
            fontWeight: 700,
            fontFamily: 'var(--font-display)',
            fontSize: 18,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 12px 24px rgba(41, 121, 255, 0.4)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          Schedule a Demo
        </button>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #1a2035', padding: '40px 20px', textAlign: 'center', maxWidth: '1200px', margin: '0 auto', fontSize: 14, color: 'var(--text-soft)' }}>
        <p>Questions? <a href="mailto:samuelmenard@gmail.com" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Email us</a></p>
        <p style={{ fontSize: 12, color: 'var(--text-mute)', marginTop: 8 }}>Hockey Shot Challenge — Digital Platform for Province-Wide & League Challenges</p>
      </footer>
    </div>
  )
}
