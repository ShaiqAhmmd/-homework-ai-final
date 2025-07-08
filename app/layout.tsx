import { ClerkProvider } from '@clerk/nextjs'
import FooterSection from './components/FooterSection'
import AuthButtons from './components/AuthButtons'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Menu } from '@headlessui/react'
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
          <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 sm:px-8 py-2 flex justify-between items-center shadow-md">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-xl sm:text-2xl">🧠</span>
              <h1 className="text-lg sm:text-2xl font-bold whitespace-nowrap">Homework AI</h1>
            </div>
            {/* Desktop nav */}
            <nav className="hidden sm:flex items-center gap-6">
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
            <div className="sm:hidden flex items-center gap-2">
              <Menu as="div" className="relative">
                <Menu.Button className="text-2xl px-2 py-1 rounded hover:bg-white/20 transition">⋯</Menu.Button>
                <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-white text-gray-900 rounded shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link href="/chat" className={`block px-4 py-2 ${active ? 'bg-gray-100' : ''}`}>Chat</Link>
                      )}
                    </Menu.Item>
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
                      <Menu.Item>
                        {() => <UserButton afterSignOutUrl="/" />}
                      </Menu.Item>
                    </SignedIn>
                    <SignedOut>
                      <Menu.Item>
                        {() => <AuthButtons />}
                      </Menu.Item>
                    </SignedOut>
                  </div>
                </Menu.Items>
              </Menu>
            </div>
          </header>
          <main className="max-w-7xl mx-auto px-2 sm:px-4 py-10 mt-28 sm:mt-20">
            {children}
          </main>
          <FooterSection />
        </body>
      </html>
    </ClerkProvider>
  )
}