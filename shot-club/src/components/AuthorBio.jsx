// Visible author byline + bio for content pages (E-A-T signal). Renders into the
// prerendered HTML so crawlers see a real, attributed human author.
export default function AuthorBio() {
  return (
    <div className="author-bio">
      <div className="author-bio-avatar" aria-hidden="true">SM</div>
      <div className="author-bio-body">
        <div className="author-bio-name">
          Written by <a href="https://www.linkedin.com/in/sammenard/" target="_blank" rel="author noopener noreferrer">Sam Menard</a>
        </div>
        <div className="author-bio-text">
          Founder of Hockey Shot Challenge, a free off-ice training tracker for youth
          hockey players. Building tools that help kids put in the work between practices.
        </div>
      </div>
      <style>{`
        .author-bio { display: flex; gap: 14px; align-items: flex-start; border: 1px solid #1a2035; background: rgba(255,255,255,0.02); border-radius: 12px; padding: 16px; margin: 40px 0 8px; }
        .author-bio-avatar { flex-shrink: 0; width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #2979ff, #7fb2ff); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 15px; letter-spacing: 0.5px; }
        .author-bio-name { font-weight: 700; color: #e8eef7; font-size: 15px; margin-bottom: 4px; }
        .author-bio-name a { color: #7fb2ff; text-decoration: none; }
        .author-bio-name a:hover { text-decoration: underline; }
        .author-bio-text { font-size: 14px; color: #8b97ad; line-height: 1.5; }
      `}</style>
    </div>
  )
}
