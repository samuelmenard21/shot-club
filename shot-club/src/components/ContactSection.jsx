import { useState, useEffect } from 'react'

/**
 * Contact section for marketing pages.
 * - Posts to Netlify Forms via fetch (no page reload).
 * - Falls back to obfuscated mailto for users who prefer their own client.
 * - Includes a hidden honeypot field for basic spam protection.
 */
export default function ContactSection() {
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [mailto, setMailto] = useState('#')
  const [mailtoLabel, setMailtoLabel] = useState('email us directly')

  // Build mailto at runtime so it isn't in the static HTML
  useEffect(() => {
    const user = 'samuelmenard'
    const domain = 'gmail.com'
    setMailto(`mailto:${user}@${domain}?subject=Hockey%20Shot%20Challenge`)
    setMailtoLabel(`${user}@${domain}`)
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot — if a bot filled this hidden field, silently succeed without sending
    if (data.get('bot-field')) {
      setSubmitting(false)
      setSubmitted(true)
      return
    }

    // Netlify Forms expects URL-encoded body with form-name
    const body = new URLSearchParams()
    for (const [k, v] of data.entries()) body.append(k, String(v))

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setSubmitted(true)
      form.reset()
    } catch (err) {
      setError("Couldn't send. Try again, or email directly below.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="contact-section">
      <div className="contact-inner">
        <div className="contact-head">
          <div className="contact-eyebrow">GET IN TOUCH</div>
          <h2 className="contact-title">Questions, ideas, or want to bring your club on board?</h2>
          <p className="contact-sub">
            Built by a hockey parent in Burlington, ON. I read everything.
          </p>
        </div>

        {!open && !submitted && (
          <div className="contact-actions">
            <button className="contact-btn-primary" onClick={() => setOpen(true)}>
              Send a message →
            </button>
            <span className="contact-or">or <a className="contact-mailto" href={mailto}>{mailtoLabel}</a></span>
          </div>
        )}

        {submitted && (
          <div className="contact-success">
            <div className="contact-success-check">✓</div>
            <div>
              <div className="contact-success-title">Message sent.</div>
              <div className="contact-success-text">Thanks — I'll get back to you soon.</div>
            </div>
          </div>
        )}

        {open && !submitted && (
          <form
            className="contact-form"
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
          >
            {/* Required by Netlify Forms for JS-submitted forms */}
            <input type="hidden" name="form-name" value="contact" />
            {/* Honeypot — hidden from humans, bots fill it */}
            <p className="contact-honeypot">
              <label>Don't fill this out if you're human: <input name="bot-field" /></label>
            </p>

            <div className="contact-row">
              <label className="contact-field">
                <span className="contact-label">Name</span>
                <input name="name" required autoComplete="name" />
              </label>
              <label className="contact-field">
                <span className="contact-label">Email</span>
                <input type="email" name="email" required autoComplete="email" />
              </label>
            </div>

            <label className="contact-field">
              <span className="contact-label">I'm a…</span>
              <select name="role" required defaultValue="">
                <option value="" disabled>Select one</option>
                <option value="coach">Coach</option>
                <option value="club_admin">Club admin / league director</option>
                <option value="parent">Parent</option>
                <option value="player">Player</option>
                <option value="other">Other</option>
              </select>
            </label>

            <label className="contact-field">
              <span className="contact-label">Message</span>
              <textarea name="message" rows="4" required />
            </label>

            {error && <div className="contact-error">{error}</div>}

            <div className="contact-submit-row">
              <button type="submit" className="contact-btn-primary" disabled={submitting}>
                {submitting ? 'Sending…' : 'Send message →'}
              </button>
              <button type="button" className="contact-btn-ghost" onClick={() => setOpen(false)}>
                Cancel
              </button>
            </div>

            <div className="contact-fallback">
              Prefer email? <a className="contact-mailto" href={mailto}>{mailtoLabel}</a>
            </div>
          </form>
        )}
      </div>

      <style>{contactStyles}</style>
    </section>
  )
}

const contactStyles = `
.contact-section {
  padding: 60px clamp(16px, 5vw, 40px);
  border-top: 0.5px solid var(--border-dim);
  background: linear-gradient(180deg, var(--bg), rgba(41, 121, 255, 0.03));
}
.contact-inner {
  max-width: 640px;
  margin: 0 auto;
}
.contact-head { text-align: center; margin-bottom: 28px; }
.contact-eyebrow {
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 600;
  color: var(--ice);
  letter-spacing: 2px;
  margin-bottom: 12px;
}
.contact-title {
  font-family: var(--font-display);
  font-size: clamp(22px, 4vw, 30px);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.2px;
  color: white;
  margin: 0 0 10px;
}
.contact-sub {
  font-size: 15px;
  color: var(--text-soft);
  line-height: 1.5;
  margin: 0;
}
.contact-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
}
.contact-or {
  color: var(--text-mute);
  font-size: 14px;
}
.contact-mailto {
  color: var(--ice);
  text-decoration: underline;
  text-decoration-color: rgba(168, 212, 245, 0.3);
  text-underline-offset: 3px;
}
.contact-mailto:hover { color: white; }

.contact-btn-primary {
  background: var(--accent);
  color: white;
  padding: 13px 22px;
  border-radius: 10px;
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.4px;
  transition: transform 0.1s, background 0.15s;
}
.contact-btn-primary:hover { background: var(--accent-soft); }
.contact-btn-primary:active { transform: scale(0.98); }
.contact-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
.contact-btn-ghost {
  background: transparent;
  color: var(--text-soft);
  padding: 13px 18px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
}
.contact-btn-ghost:hover { color: white; }

.contact-form {
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: 14px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  animation: contact-fade-in 0.2s ease-out;
}
@keyframes contact-fade-in {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
.contact-honeypot {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
.contact-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
}
@media (min-width: 600px) {
  .contact-row { grid-template-columns: 1fr 1fr; }
}
.contact-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.contact-label {
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 600;
  color: var(--text-mute);
  letter-spacing: 1px;
  text-transform: uppercase;
}
.contact-field input,
.contact-field select,
.contact-field textarea {
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  border-radius: 8px;
  padding: 11px 12px;
  color: var(--text);
  font-family: var(--font-body);
  font-size: 15px;
  width: 100%;
  outline: none;
  transition: border-color 0.15s;
}
.contact-field input:focus,
.contact-field select:focus,
.contact-field textarea:focus {
  border-color: var(--accent);
}
.contact-field textarea {
  resize: vertical;
  min-height: 90px;
  font-family: var(--font-body);
}
.contact-field select {
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, var(--text-mute) 50%), linear-gradient(135deg, var(--text-mute) 50%, transparent 50%);
  background-position: calc(100% - 18px) 50%, calc(100% - 13px) 50%;
  background-size: 5px 5px, 5px 5px;
  background-repeat: no-repeat;
  padding-right: 32px;
}

.contact-error {
  background: rgba(255, 122, 41, 0.12);
  border: 0.5px solid rgba(255, 122, 41, 0.4);
  color: var(--warn-soft);
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 13px;
}

.contact-submit-row {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: 4px;
}

.contact-fallback {
  font-size: 13px;
  color: var(--text-mute);
  text-align: center;
  margin-top: 4px;
}

.contact-success {
  background: var(--surface);
  border: 0.5px solid rgba(61, 214, 140, 0.4);
  border-radius: 12px;
  padding: 18px 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  animation: contact-fade-in 0.25s ease-out;
}
.contact-success-check {
  width: 38px; height: 38px;
  background: rgba(61, 214, 140, 0.18);
  color: var(--success);
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 800;
  flex-shrink: 0;
}
.contact-success-title {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  color: white;
}
.contact-success-text {
  font-size: 14px;
  color: var(--text-soft);
  margin-top: 2px;
}
`
