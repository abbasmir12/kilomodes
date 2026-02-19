'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { modes, categories } from '@/data/modes'
import ModeCard from '@/components/ModeCard'
import ModeModal from '@/components/ModeModal'
import { useToast, ToastContainer } from '@/components/Toast'
import type { Mode } from '@/data/modes'

const featuredModes = modes.slice(0, 6)

export default function HomePage() {
  const [selectedMode, setSelectedMode] = useState<Mode | null>(null)
  const [totalModes, setTotalModes] = useState(modes.length)
  const { toasts, showToast } = useToast()

  useEffect(() => {
    const userModes = JSON.parse(localStorage.getItem('userModes') || '[]')
    setTotalModes(userModes.length + modes.length)
  }, [])

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}>
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
          Built for DeveloperWeek 2026 Hackathon
        </div>
        <h1 className="hero-title">
          The Community Mode Gallery<br />
          for <span className="accent" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="48" height="48" style={{ display: 'inline-block' }}>
              <g>
                <path fill="currentColor" d="M0,0v100h100V0H0ZM92.5925926,92.5925926H7.4074074V7.4074074h85.1851852v85.1851852ZM61.1111044,71.9096084h9.2592593v7.4074074h-11.6402116l-5.026455-5.026455v-11.6402116h7.4074074v9.2592593ZM77.7777711,71.9096084h-7.4074074v-9.2592593h-9.2592593v-7.4074074h11.6402116l5.026455,5.026455v11.6402116ZM46.2962963,61.1114207h-7.4074074v-7.4074074h7.4074074v7.4074074ZM22.2222222,53.7040133h7.4074074v16.6666667h16.6666667v7.4074074h-19.047619l-5.026455-5.026455v-19.047619ZM77.7777711,38.8888889v7.4074074h-24.0740741v-7.4074074h8.2781918v-9.2592593h-8.2781918v-7.4074074h10.6591442l5.026455,5.026455v11.6402116h8.3884749ZM29.6296296,30.5555556h9.2592593l7.4074074,7.4074074v8.3333333h-7.4074074v-8.3333333h-9.2592593v8.3333333h-7.4074074v-24.0740741h7.4074074v8.3333333ZM46.2962963,30.5555556h-7.4074074v-8.3333333h7.4074074v8.3333333Z"/>
              </g>
            </svg>
            Kilo Code
          </span>
        </h1>
        <p className="hero-subtitle">
          Discover, copy, and share custom modes built by the Kilo developer community.
          Supercharge your AI coding assistant in seconds.
        </p>
        <div className="hero-actions">
          <Link href="/gallery" className="btn-primary">
            Browse Gallery →
          </Link>
          <Link href="/submit" className="btn-secondary">
            Submit a Mode
          </Link>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="stats-bar">
        <div className="stat-item">
          <div className="stat-value">{totalModes}</div>
          <div className="stat-label">Custom Modes</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{categories.length - 1}</div>
          <div className="stat-label">Categories</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">∞</div>
          <div className="stat-label">Community Powered</div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ background: 'var(--bg-elevated)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="section">
          <div className="section-header">
            <div className="section-label">// How it works</div>
            <h2 className="section-title">From discovery to deployment in four steps</h2>
          </div>
          <div className="steps-grid">
            {[
              { num: '01', icon: 'search', title: 'Browse', desc: 'Discover modes by category or search by keyword, tag, or functionality.' },
              { num: '02', icon: 'eye', title: 'Preview', desc: 'See the full YAML config with syntax highlighting before committing.' },
              { num: '03', icon: 'clipboard', title: 'Copy', desc: 'One-click copy to clipboard. No downloads, no friction, no nonsense.' },
              { num: '04', icon: 'zap', title: 'Use', desc: 'Paste into Kilo and start coding smarter. Takes seconds, saves hours.' },
            ].map(step => (
              <div key={step.num} className="step-card">
                <div className="step-number">{step.num}</div>
                <svg className="step-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {step.icon === 'search' && <><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></>}
                  {step.icon === 'eye' && <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}
                  {step.icon === 'clipboard' && <><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></>}
                  {step.icon === 'zap' && <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>}
                </svg>
                <div className="step-title">{step.title}</div>
                <div className="step-desc">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURED MODES */}
      <div className="section">
        <div className="section-header" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div className="section-label">// Featured modes</div>
            <h2 className="section-title">Community favorites</h2>
            <p className="section-subtitle">The most-copied modes from our developer community.</p>
          </div>
          <Link href="/gallery" className="btn-secondary" style={{ whiteSpace: 'nowrap' }}>
            View all →
          </Link>
        </div>
        <div className="cards-grid">
          {featuredModes.map(mode => (
            <ModeCard
              key={mode.id}
              mode={mode}
              onPreview={setSelectedMode}
              onCopied={() => showToast('YAML copied to clipboard')}
            />
          ))}
        </div>
      </div>

      {/* CTA BANNER */}
      <div className="section" style={{ paddingTop: 0 }}>
        <div className="cta-banner">
          <div className="section-label" style={{ marginBottom: '12px' }}>// Contribute</div>
          <h2 className="cta-title">Have a mode to share?</h2>
          <p className="cta-sub">Submit it to the gallery and help the community code smarter.</p>
          <Link href="/submit" className="btn-primary">
            Submit a Mode →
          </Link>
        </div>
      </div>

      <ModeModal
        mode={selectedMode}
        onClose={() => setSelectedMode(null)}
        onCopied={() => showToast('YAML copied to clipboard')}
      />
      <ToastContainer toasts={toasts} />
    </>
  )
}
