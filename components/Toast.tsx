'use client'
import { useState, useCallback } from 'react'

let toastId = 0

interface Toast {
  id: number
  message: string
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((message: string) => {
    const id = ++toastId
    setToasts(prev => [...prev, { id, message }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 2000)
  }, [])

  return { toasts, showToast }
}

export function ToastContainer({ toasts }: { toasts: { id: number; message: string }[] }) {
  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className="toast">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }}>
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          {toast.message}
        </div>
      ))}
    </div>
  )
}
