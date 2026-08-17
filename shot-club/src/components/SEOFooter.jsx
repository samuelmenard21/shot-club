import { useNavigate } from 'react-router-dom'

export default function SEOFooter() {
  const nav = useNavigate()

  return (
    <footer className="seo-footer">
      <div className="seo-footer-container">
        <div className="seo-footer-section">
          <h3>Quick Links</h3>
          <button onClick={() => nav('/')}>Home</button>
          <button onClick={() => nav('/start')}>Sign In</button>
          <button onClick={() => nav('/player')}>For Players</button>
          <button onClick={() => nav('/coach')}>For Coaches</button>
          <button onClick={() => nav('/for-clubs')}>For Clubs</button>
          <button onClick={() => nav('/find-club')}>Find Club</button>
        </div>

        <div className="seo-footer-section">
          <h3>Learn</h3>
          <button onClick={() => nav('/blog')}>All Guides</button>
          <button onClick={() => nav('/blog/getting-started')}>Getting Started</button>
          <button onClick={() => nav('/blog/parents-guide-youth-hockey')}>Parents' Guide</button>
          <button onClick={() => nav('/blog/building-practice-routine')}>Practice Routine</button>
          <button onClick={() => nav('/blog/off-ice-drills')}>Off-Ice Drills</button>
        </div>

        <div className="seo-footer-section">
          <h3>Challenges</h3>
          <button onClick={() => nav('/challenges')}>All Challenges</button>
          <button onClick={() => nav('/1000-shot-rookie-challenge')}>Rookie (1K)</button>
          <button onClick={() => nav('/2500-shot-pro-challenge')}>Pro (2.5K)</button>
          <button onClick={() => nav('/5000-shot-elite-challenge')}>Elite (5K)</button>
          <button onClick={() => nav('/10000-shot-hall-of-famer-challenge')}>Hall of Famer (10K)</button>
          <button onClick={() => nav('/province-wide-challenge')}>Leagues & Teams</button>
        </div>

        <div className="seo-footer-section">
          <h3>Rankings</h3>
          <button onClick={() => nav('/rankings')}>Player Rankings</button>
          <button onClick={() => nav('/clubs')}>Find Clubs</button>
        </div>

        <div className="seo-footer-section">
          <h3>Legal</h3>
          <button onClick={() => nav('/privacy')}>Privacy Policy</button>
          <button onClick={() => nav('/about')}>About Us</button>
        </div>
      </div>

      <style>{styles}</style>
    </footer>
  )
}

const styles = `
.seo-footer {
  background: var(--bg-dim);
  border-top: 1px solid var(--border-dim);
  padding: 40px 20px;
  margin-top: 60px;
}

.seo-footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
}

.seo-footer-section h3 {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--text-soft);
  margin-bottom: 16px;
  text-transform: uppercase;
}

.seo-footer-section button {
  display: block;
  color: var(--text-soft);
  background: none;
  border: none;
  padding: 8px 0;
  font-size: 14px;
  line-height: 1.5;
  cursor: pointer;
  transition: color 0.2s;
  text-align: left;
}

.seo-footer-section button:hover {
  color: var(--text);
}

@media (max-width: 640px) {
  .seo-footer-container {
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .seo-footer-section h3 {
    font-size: 12px;
    margin-bottom: 12px;
  }

  .seo-footer-section button {
    font-size: 13px;
    padding: 6px 0;
  }
}
`
