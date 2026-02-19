'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { categories } from '@/data/modes'
import { useToast, ToastContainer } from '@/components/Toast'

export default function SubmitPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    customCategory: '',
    description: '',
    tags: '',
    github: '',
    yaml: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const { toasts, showToast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    if (!formData.name || !formData.category || !formData.description || !formData.yaml) {
      showToast('Please fill in all required fields')
      return
    }

    // If Custom category selected, require custom category name
    if (formData.category === 'Custom' && !formData.customCategory.trim()) {
      showToast('Please enter a custom category name')
      return
    }

    // Use custom category name if "Custom" is selected
    const finalCategory = formData.category === 'Custom' ? formData.customCategory.trim() : formData.category

    // Create new mode object
    const newMode = {
      id: `user-${Date.now()}`,
      name: formData.name,
      author: formData.github || 'anonymous',
      category: finalCategory,
      description: formData.description,
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
      copies: 0,
      dateAdded: new Date().toISOString().split('T')[0],
      yaml: formData.yaml
    }

    console.log('Submitting mode:', newMode)

    // Get existing user modes from localStorage
    const existingModes = JSON.parse(localStorage.getItem('userModes') || '[]')
    console.log('Existing modes before:', existingModes)
    
    // Add new mode at the beginning
    existingModes.unshift(newMode)
    
    // Save to localStorage
    localStorage.setItem('userModes', JSON.stringify(existingModes))
    console.log('Saved to localStorage. Total modes:', existingModes.length)
    
    setSubmitted(true)
    showToast('Mode published to marketplace!')
    
    // Force full page reload to gallery
    setTimeout(() => {
      window.location.href = '/gallery'
    }, 1500)
  }

  return (
    <>
      <div className="submit-page">
        <div className="section-label">// Submit</div>
        <h1 className="section-title" style={{ marginBottom: '8px' }}>Share Your Mode</h1>
        <p className="section-subtitle" style={{ marginBottom: '32px' }}>
          Built a useful Kilo custom mode? Publish it instantly to the community marketplace.
        </p>

        <div className="submit-note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
          </svg>
          Your mode will appear immediately in the gallery. Community moderation tools coming soon.
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Mode Name</label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-input"
              placeholder="e.g. Bug Finder"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              className="form-input form-select"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category...</option>
              {categories.filter(c => c !== 'All').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {formData.category === 'Custom' && (
            <div className="form-group" style={{ marginTop: '-8px' }}>
              <label className="form-label" htmlFor="customCategory">Custom Category Name</label>
              <input
                id="customCategory"
                name="customCategory"
                type="text"
                className="form-input"
                placeholder="e.g. Game Development, Data Science, etc."
                value={formData.customCategory}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              className="form-textarea"
              placeholder="Describe what your mode does and when to use it..."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="tags">Tags</label>
            <input
              id="tags"
              name="tags"
              type="text"
              className="form-input"
              placeholder="e.g. testing, bugs, quality (comma-separated)"
              value={formData.tags}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="github">Your GitHub Username</label>
            <input
              id="github"
              name="github"
              type="text"
              className="form-input"
              placeholder="e.g. octocat"
              value={formData.github}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="yaml">YAML Content</label>
            <textarea
              id="yaml"
              name="yaml"
              className="form-textarea mono"
              placeholder={`slug: my-mode\nname: My Mode\nmodel: claude-sonnet-4-5\nroleDefinition: >\n  You are...\ncustomInstructions: >\n  When working...\ngroups:\n  - read\n  - edit`}
              value={formData.yaml}
              onChange={handleChange}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary"
            disabled={submitted}
          >
            {submitted ? 'Published! Redirecting...' : 'Publish Mode'}
          </button>
        </form>
      </div>
      
      <ToastContainer toasts={toasts} />
    </>
  )
}
