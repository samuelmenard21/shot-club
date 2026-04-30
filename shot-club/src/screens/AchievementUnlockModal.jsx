import { useEffect, useState } from 'react'
import { lineForAchievement } from '../lib/coachSam'

const DISPLAY = {
  card_holder:     { title: 'Card Holder',      icon: '🎫', sub: 'Your card is official.' },
  first_shot:      { title: 'First Shot',       icon: '🏒', sub: 'Logged your very first shot.' },
  hundred_club:    { title: '100 Club',         icon: '💯', sub: '100 lifetime shots.' },
  one_k:           { title: '1,000 Shots',      icon: '🔥', sub: 'You crossed 1K.' },
  ten_k:           { title: '10,000 Shots',     icon: '🏆', sub: 'Elite tier. Few get here.' },
  week_streak:     { title: 'Week Streak',      icon: '⚡', sub: '7 days in a row.' },
  month_streak:    { title: 'Month Streak',     icon: '🌟', sub: '30 days in a row.' },
  specialty_found: { title: 'Found Your Shot',  icon: '🎯', sub: 'A specialty showed up.' },
}

export default function AchievementUnlockModal({ codes, onDismiss }) {
  const [index, setIndex] = useState(0)

  useEffect(() => { setIndex(0) }, [codes])

  if (!codes || codes.length === 0) return null
  const current = codes[index]
  const display = DISPLAY[current]
  if (!display) {
    setTimeout(() => handleNext(), 0)
    return null
  }

  function handleNext() {
    if (index + 1 >= codes.length) onDismiss()
    else setIndex(index + 1)
  }

  return (
    <div onClick={handleNext} className="ach-overlay">
      <div className="ach-kicker">ACHIEVEMENT UNLOCKED</div>
      <div className="ach-icon">{display.icon}</div>
      <div className="ach-title">{display.title}</div>
      <div className="ach-sub">{display.sub}</div>
      <div className="ach-quote">"{lineForAchievement(current)}"</div>
      <div className="ach-tap">
        {codes.length > 1 ? `${index + 1} of ${codes.length} — tap to continue` : 'Tap anywhere to continue'}
      </div>
      <style>{`
        .ach-overlay {
          position: fixed; inset: 0;
          background: rgba(10, 14, 26, 0.96);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          z-index: 9999;
          cursor: pointer;
          padding: 24px;
          animation: achFade 0.3s ease-out;
        }
        .ach-kicker {
          font-size: 11px;
          color: var(--ice, #a8d4f5);
          letter-spacing: 3px;
          margin-bottom: 32px;
          font-weight: 600;
        }
        .ach-icon {
          font-size: 110px;
          margin-bottom: 20px;
          animation: achPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          filter: drop-shadow(0 0 24px rgba(41, 121, 255, 0.6));
        }
        .ach-title {
          font-family: var(--font-display);
          font-size: 40px;
          font-weight: 800;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
          text-align: center;
          line-height: 1;
        }
        .ach-sub {
          color: var(--ice, #a8d4f5);
          font-size: 15px;
          margin-bottom: 28px;
          text-align: center;
        }
        .ach-quote {
          background: rgba(41, 121, 255, 0.15);
          border: 0.5px solid rgba(41, 121, 255, 0.4);
          border-radius: 12px;
          padding: 12px 20px;
          max-width: 320px;
          text-align: center;
          color: #fff;
          font-style: italic;
          font-size: 14px;
          margin-bottom: 32px;
          line-height: 1.4;
        }
        .ach-tap {
          color: var(--text-mute, #6b7a99);
          font-size: 12px;
          letter-spacing: 0.5px;
        }
        @keyframes achFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes achPop {
          0% { transform: scale(0); }
          60% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  )
}
