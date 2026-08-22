import { Link } from 'react-router-dom'

export default function SEOFooter() {
  return (
    <footer className="seo-footer">
      <div className="seo-footer-container">
        <div className="seo-footer-section">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/start">Sign In</Link>
          <Link to="/player">For Players</Link>
          <Link to="/coach">For Coaches</Link>
          <Link to="/for-clubs">For Clubs</Link>
          <Link to="/find-club">Find Club</Link>
        </div>

        <div className="seo-footer-section">
          <h3>Guides</h3>
          <Link to="/blog">All Guides</Link>
          <Link to="/blog/getting-started">Getting Started</Link>
          <Link to="/blog/parents-guide-youth-hockey">Parents' Guide</Link>
          <Link to="/blog/building-practice-routine">Practice Routine</Link>
          <Link to="/blog/off-ice-drills">Off-Ice Drills</Link>
          <Link to="/blog/7-off-ice-drills">7 Off-Ice Drills</Link>
          <Link to="/blog/hockey-iq-vs-skill">Hockey IQ vs Skill</Link>
          <Link to="/blog/5-week-progression">5-Week Progression</Link>
          <Link to="/blog/burnout-prevention">Burnout Prevention</Link>
          <Link to="/blog/80-20-finishers">The 80/20 Rule</Link>
          <Link to="/blog/how-squad-battles-work">Squad Battles</Link>
        </div>

        <div className="seo-footer-section">
          <h3>Challenges</h3>
          <Link to="/challenges">All Challenges</Link>
          <Link to="/1000-shot-rookie-challenge">Rookie (1K)</Link>
          <Link to="/2500-shot-pro-challenge">Pro (2.5K)</Link>
          <Link to="/5000-shot-elite-challenge">Elite (5K)</Link>
          <Link to="/10000-shot-hall-of-famer-challenge">Hall of Famer (10K)</Link>
          <Link to="/province-wide-challenge">Leagues & Teams</Link>
        </div>

        <div className="seo-footer-section">
          <h3>Challenge Guides</h3>
          <Link to="/blog/rookie-challenge">Rookie Challenge</Link>
          <Link to="/blog/pro-challenge">Pro Challenge</Link>
          <Link to="/blog/elite-challenge">Elite Challenge</Link>
          <Link to="/blog/hall-of-famer-challenge">Hall of Famer</Link>
        </div>

        <div className="seo-footer-section">
          <h3>Rankings</h3>
          <Link to="/rankings">Player Rankings</Link>
          <Link to="/clubs">Find Clubs</Link>
        </div>

        <div className="seo-footer-section">
          <h3>Legal</h3>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/about">About Us</Link>
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

.seo-footer-section a {
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
  text-decoration: none;
}

.seo-footer-section a:hover {
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

  .seo-footer-section a {
    font-size: 13px;
    padding: 6px 0;
  }
}
`
