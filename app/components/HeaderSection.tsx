'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import AuthButtons from './AuthButtons'

export default function HeaderSection() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-xl">🧠</span>
          <span className="text-lg font-bold whitespace-nowrap">Homework AI</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4">
          <Link href="/chat" className="font-semibold hover:underline underline-offset-4 transition">Chat</Link>
          <Link href="/pricing" className="font-semibold hover:underline underline-offset-4 transition">Pricing</Link>
          <Link href="/study-tools" className="font-semibold hover:underline underline-offset-4 transition">Study Tools</Link>
          <Link href="/profile" className="font-semibold hover:underline underline-offset-4 transition">Profile</Link>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <AuthButtons />
          </SignedOut>
        </nav>

        {/* Mobile Nav */}
        <div className="flex md:hidden items-center gap-2">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <AuthButtons />
          </SignedOut>
          {/* 3-dot menu */}
          <button
            className="ml-2 p-2 rounded hover:bg-white/20"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="5" cy="12" r="2"/>
              <circle cx="12" cy="12" r="2"/>
              <circle cx="19" cy="12" r="2"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white rounded-b-xl shadow-lg mt-1 py-2 px-4 animate-fade-in flex flex-col gap-2">
          <Link href="/chat" className="text-blue-700 font-medium py-2 border-b border-gray-100">Chat</Link>
          <Link href="/pricing" className="text-blue-700 font-medium py-2 border-b border-gray-100">Pricing</Link>
          <Link href="/study-tools" className="text-blue-700 font-medium py-2 border-b border-gray-100">Study Tools</Link>
          <Link href="/profile" className="text-blue-700 font-medium py-2">Profile</Link>
          <Link href="/pdf-analyzer" className="font-semibold hover:underline underline-offset-4 transition">
  PDF Analyzer
</Link>
        </div>
      )}
    </header>
  )
}