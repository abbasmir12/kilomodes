import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="navbar-logo" style={{ display: 'inline-flex' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
            KiloModes
          </div>
          <p>The community-driven gallery for Kilo Code custom modes. Built by devs, for devs.</p>
          <div style={{ marginTop: '16px' }}>
            <span className="hackathon-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}>
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
              </svg>
              DeveloperWeek 2026 Hackathon
            </span>
          </div>
        </div>
        <div className="footer-col">
          <div className="footer-col-title">Product</div>
          <ul>
            <li><Link href="/gallery">Browse Gallery</Link></li>
            <li><Link href="/submit">Submit a Mode</Link></li>
            <li><a href="https://kilo.ai" target="_blank" rel="noopener">Kilo Code</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <div className="footer-col-title">Community</div>
          <ul>
            <li><a href="https://github.com/Kilo-Org/kilocode" target="_blank" rel="noopener">GitHub</a></li>
            <li><a href="https://github.com/Kilo-Org/kilocode/discussions/1671" target="_blank" rel="noopener">Discussions</a></li>
            <li><a href="https://kilo.ai" target="_blank" rel="noopener">Discord</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <div className="footer-col-title">Resources</div>
          <ul>
            <li><a href="https://kilo.ai" target="_blank" rel="noopener">Docs</a></li>
            <li><a href="https://kilo.ai" target="_blank" rel="noopener">VS Code Extension</a></li>
            <li><a href="https://kilo.ai" target="_blank" rel="noopener">CLI</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 KiloModes — Built for DeveloperWeek 2026 Hackathon · Kilo "For Devs, By Devs" Challenge</p>
        <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          Built with 
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#a78bfa' }}>
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
          Kilo Code
        </p>
      </div>
    </footer>
  )
}
