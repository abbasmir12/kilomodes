'use client'
import { useState, useEffect } from 'react'
import { Mode, categoryColors } from '@/data/modes'

interface ModeModalProps {
  mode: Mode | null
  onClose: () => void
  onCopied: () => void
}

function highlightYaml(yaml: string): string {
  return yaml
    .split('\n')
    .map(line => {
      if (line.trim().startsWith('#')) {
        return `<span class="yaml-comment">${line}</span>`
      }
      if (line.trim().startsWith('- ')) {
        return line.replace(/^(\s*- )(.*)$/, '$1<span class="yaml-bullet">$2</span>')
      }
      if (line.includes(': ')) {
        return line.replace(/^(\s*)([\w-]+)(:)(.*)$/, (_, sp, key, colon, val) => {
          const v = val.trim()
          const valHtml = v.startsWith('>') || v === ''
            ? `<span class="yaml-value">${val}</span>`
            : `<span class="yaml-string">${val}</span>`
          return `${sp}<span class="yaml-key">${key}</span><span class="yaml-value">${colon}</span>${valHtml}`
        })
      }
      if (line.endsWith(':')) {
        return line.replace(/^(\s*)([\w-]+)(:)$/, '$1<span class="yaml-key">$2</span><span class="yaml-value">$3</span>')
      }
      return line
    })
    .join('\n')
}

export default function ModeModal({ mode, onClose, onCopied }: ModeModalProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  useEffect(() => {
    if (mode) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mode])

  if (!mode) return null

  const color = categoryColors[mode.category] || '#8b5cf6'

  const handleCopy = async () => {
    await navigator.clipboard.writeText(mode.yaml)
    setCopied(true)
    onCopied()
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="modal-title">{mode.name}</div>
            <div className="modal-meta">
              <span
                className="category-badge"
                style={{
                  background: `${color}18`,
                  border: `1px solid ${color}40`,
                  color
                }}
              >
                {mode.category}
              </span>
              <span>by @{mode.author}</span>
              <span>Added {new Date(mode.dateAdded).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
              <span>📋 {mode.copies.toLocaleString()} copies</span>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <p className="modal-desc">{mode.description}</p>

        <div className="code-block">
          <div className="code-header">
            <div className="code-dots">
              <span style={{ background: '#ef4444' }}></span>
              <span style={{ background: '#f59e0b' }}></span>
              <span style={{ background: '#22c55e' }}></span>
            </div>
            <span className="code-lang">YAML</span>
          </div>
          <div className="code-content">
            <pre dangerouslySetInnerHTML={{ __html: highlightYaml(mode.yaml) }} />
          </div>
        </div>

        <div className="modal-footer">
          <button
            className={`btn-primary ${copied ? '' : ''}`}
            onClick={handleCopy}
            style={copied ? { background: '#16a34a' } : {}}
          >
            {copied ? '✓ Copied to Clipboard!' : '📋 Copy YAML'}
          </button>
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
