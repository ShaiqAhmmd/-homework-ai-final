import { Menu } from '@headlessui/react'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import AuthButtons from './components/AuthButtons'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 sm:px-8 py-2 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-2 sm:gap-3">
        <span className="text-xl sm:text-2xl">🧠</span>
        <h1 className="text-lg sm:text-2xl font-bold whitespace-nowrap">Homework AI</h1>
      </div>
      <nav className="flex items-center gap-2 sm:gap-6">
        {/* Always visible links */}
        <Link href="/chat" className="font-semibold hover:underline underline-offset-4 transition">Chat</Link>
        {/* "Extras" dropdown for mobile */}
        <Menu as="div" className="relative inline-block text-left sm:hidden">
          <Menu.Button className="px-2 py-1 rounded hover:bg-white/20 transition font-bold text-lg">⋯</Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-white text-gray-900 rounded shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link href="/pricing" className={`block px-4 py-2 ${active ? 'bg-gray-100' : ''}`}>Pricing</Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link href="/study-tools" className={`block px-4 py-2 ${active ? 'bg-gray-100' : ''}`}>Study Tools</Link>
                )}
              </Menu.Item>
              <SignedIn>
                <Menu.Item>
                  {({ active }) => (
                    <Link href="/profile" className={`block px-4 py-2 ${active ? 'bg-gray-100' : ''}`}>Profile</Link>
                  )}
                </Menu.Item>
              </SignedIn>
            </div>
          </Menu.Items>
        </Menu>
        {/* Show all links on desktop */}
        <div className="hidden sm:flex items-center gap-6">
          <Link href="/pricing" className="font-semibold hover:underline underline-offset-4 transition">Pricing</Link>
          <Link href="/study-tools" className="font-semibold hover:underline underline-offset-4 transition">Study Tools</Link>
          <SignedIn>
            <Link href="/profile" className="font-semibold hover:underline underline-offset-4 transition">Profile</Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
        <SignedOut>
          <AuthButtons />
        </SignedOut>
      </nav>
    </header>
  )
}