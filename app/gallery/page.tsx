'use client'
import { useState, useMemo, useEffect } from 'react'
import { modes, categories } from '@/data/modes'
import ModeCard from '@/components/ModeCard'
import ModeModal from '@/components/ModeModal'
import { useToast, ToastContainer } from '@/components/Toast'
import type { Mode } from '@/data/modes'

type SortOption = 'copies' | 'newest' | 'alphabetical'

export default function GalleryPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [sort, setSort] = useState<SortOption>('newest')
  const [selectedMode, setSelectedMode] = useState<Mode | null>(null)
  const [allModes, setAllModes] = useState<Mode[]>([])
  const { toasts, showToast } = useToast()

  // Load user-submitted modes from localStorage
  useEffect(() => {
    const loadModes = () => {
      const userModes = JSON.parse(localStorage.getItem('userModes') || '[]')
      console.log('Gallery: Loaded user modes from localStorage:', userModes.length)
      const combined = [...userModes, ...modes]
      console.log('Gallery: Total modes (user + default):', combined.length)
      setAllModes(combined)
    }
    
    loadModes()
    
    // Reload when page becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('Gallery: Page visible, reloading modes')
        loadModes()
      }
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  const filtered = useMemo(() => {
    let result = [...allModes]

    if (activeCategory !== 'All') {
      result = result.filter(m => m.category === activeCategory)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.tags.some(t => t.includes(q)) ||
        m.category.toLowerCase().includes(q)
      )
    }

    switch (sort) {
      case 'copies': result.sort((a, b) => b.copies - a.copies); break
      case 'newest': result.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()); break
      case 'alphabetical': result.sort((a, b) => a.name.localeCompare(b.name)); break
    }

    return result
  }, [search, activeCategory, sort, allModes])

  return (
    <>
      <div className="gallery-header">
        <div className="section-label">// Gallery</div>
        <h1 className="section-title" style={{ marginBottom: '8px' }}>Browse All Modes</h1>
        <p className="section-subtitle">
          {allModes.length} community-built custom modes for Kilo Code.
        </p>

        <div className="gallery-controls" style={{ marginTop: '32px' }}>
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search modes, tags, categories..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="sort-wrap">
            <select
              className="sort-select"
              value={sort}
              onChange={e => setSort(e.target.value as SortOption)}
            >
              <option value="copies">Most Copied</option>
              <option value="newest">Newest First</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
        </div>

        <div className="category-tabs">
          {categories.map(cat => (
            <button
              key={cat}
              className={`cat-tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="results-count">
        {filtered.length === modes.length
          ? `Showing all ${filtered.length} modes`
          : `${filtered.length} mode${filtered.length !== 1 ? 's' : ''} found`}
      </div>

      <div style={{ padding: '0 2rem 80px', maxWidth: '1200px', margin: '0 auto' }}>
        {filtered.length > 0 ? (
          <div className="cards-grid">
            {filtered.map(mode => (
              <ModeCard
                key={mode.id}
                mode={mode}
                onPreview={setSelectedMode}
                onCopied={() => showToast('YAML copied to clipboard')}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3>No modes found</h3>
            <p>Try adjusting your search or category filter.</p>
          </div>
        )}
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
