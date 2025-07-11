import { ClerkProvider } from '@clerk/nextjs'
import FooterSection from './components/FooterSection'
import AuthButtons from './components/AuthButtons'
import DarkModeToggle from './components/DarkModeToggle'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
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
        <body
          className={inter.className}
          style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}
        >
          <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 flex flex-wrap justify-between items-center shadow-md">
            <div className="flex items-center gap-2">
              <span className="text-xl">🧠</span>
              <h1 className="text-lg font-bold whitespace-nowrap">Homework AI</h1>
            </div>
            <nav className="flex flex-wrap items-center gap-3">
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
              <DarkModeToggle />
            </nav>
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