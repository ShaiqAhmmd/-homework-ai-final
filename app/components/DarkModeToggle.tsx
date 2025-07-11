'use client'

import { useEffect, useState } from 'react'

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.body.classList.add('dark')
      setIsDark(true)
    }
  }, [])

  const toggleDark = () => {
    if (isDark) {
      document.body.classList.remove('dark')
      localStorage.theme = 'light'
      setIsDark(false)
    } else {
      document.body.classList.add('dark')
      localStorage.theme = 'dark'
      setIsDark(true)
    }
  }

  return (
    <button
      onClick={toggleDark}
      style={{
        marginLeft: 16,
        padding: '6px 16px',
        borderRadius: 6,
        background: isDark ? '#333' : '#eee',
        color: isDark ? '#fff' : '#222',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 600,
      }}
    >
      {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  )
}