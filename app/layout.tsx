import { ClerkProvider } from '@clerk/nextjs'
import FooterSection from './components/FooterSection'
import AuthButtons from './components/AuthButtons'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem
} from '@headlessui/react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Homework AI',
  description: 'Your Intelligent Study Assistant',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-gray-50`}>
          <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 flex justify-between items-center shadow-md">
            <div className="flex items-center gap-2">
              <span className="text-xl">🧠</span>
              <h1 className="text-lg font-bold whitespace-nowrap">Homework AI</h1>
            </div>
            {/* Desktop nav */}
            <nav className="hidden sm:flex items-center gap-4">
              <Link href="/chat" className="font-semibold hover:underline underline-offset-4 transition">Chat</Link>
              <Link href="/pricing" className="font-semibold hover:underline underline-offset-4 transition">Pricing</Link>
              <Link href="/study-tools" className="font-semibold hover:underline underline-offset-4 transition">Study Tools</Link>
              <SignedIn>
                <Link href="/profile" className="font-semibold hover:underline underline-offset-4 transition">Profile</Link>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <AuthButtons />
              </SignedOut>
            </nav>
            {/* Mobile nav: 3-dots menu */}
            <div className="sm:hidden flex items-center">
              <Menu as="div" className="relative">
                <MenuButton className="text-2xl px-2 py-1 rounded hover:bg-white/20 transition">⋯</MenuButton>
                <MenuItems className="absolute right-0 mt-2 w-40 origin-top-right bg-white text-gray-900 rounded shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="py-1">
                    <MenuItem>
                      {({ active }) => (
                        <Link href="/chat" className={`block px-4 py-2 ${active ? 'bg-gray-100' : ''}`}>Chat</Link>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <Link href="/pricing" className={`block px-4 py-2 ${active ? 'bg-gray-100' : ''}`}>Pricing</Link>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <Link href="/study-tools" className={`block px-4 py-2 ${active ? 'bg-gray-100' : ''}`}>Study Tools</Link>
                      )}
                    </MenuItem>
                    <SignedIn>
                      <MenuItem>
                        {({ active }) => (
                          <Link href="/profile" className={`block px-4 py-2 ${active ? 'bg-gray-100' : ''}`}>Profile</Link>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {() => <UserButton afterSignOutUrl="/" />}
                      </MenuItem>
                    </SignedIn>
                    <SignedOut>
                      <MenuItem>
                        {() => <AuthButtons />}
                      </MenuItem>
                    </SignedOut>
                  </div>
                </MenuItems>
              </Menu>
            </div>
          </header>
          <main className="max-w-7xl mx-auto px-4 py-10 mt-20">
            {children}
          </main>
          <FooterSection />
        </body>
      </html>
    </ClerkProvider>
  )
}