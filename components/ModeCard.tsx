'use client'
import { useState } from 'react'
import { Mode, categoryColors } from '@/data/modes'

interface ModeCardProps {
  mode: Mode
  onPreview: (mode: Mode) => void
  onCopied: () => void
}

export default function ModeCard({ mode, onPreview, onCopied }: ModeCardProps) {
  const [copied, setCopied] = useState(false)
  const color = categoryColors[mode.category] || '#8b5cf6'

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation()
    await navigator.clipboard.writeText(mode.yaml)
    setCopied(true)
    onCopied()
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mode-card" onClick={() => onPreview(mode)}>
      <div className="card-header">
        <div>
          <div className="card-name">{mode.name}</div>
          <div className="card-author">by @{mode.author}</div>
        </div>
        <span
          className="category-badge"
          style={{
            background: `${color}18`,
            border: `1px solid ${color}40`,
            color: color
          }}
        >
          {mode.category}
        </span>
      </div>

      <p className="card-desc">{mode.description}</p>

      <div className="card-tags">
        {mode.tags.slice(0, 4).map(tag => (
          <span key={tag} className="tag">#{tag}</span>
        ))}
      </div>

      <div className="card-footer">
        <div className="copy-count">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }}>
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
          </svg>
          {mode.copies.toLocaleString()} copies
        </div>
        <div className="card-actions">
          <button className="btn-sm" onClick={(e) => { e.stopPropagation(); onPreview(mode) }}>
            Preview
          </button>
          <button
            className={`btn-sm primary ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }}>
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Copied!
              </>
            ) : 'Copy YAML'}
          </button>
        </div>
      </div>
    </div>
  )
}
