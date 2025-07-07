import { ClerkProvider } from '@clerk/nextjs'
import FooterSection from './components/FooterSection'
import AuthButtons from './components/AuthButtons'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import './globals.css'
import BackToTopButton from './components/BackToTopButton'

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
          {/* Sticky Header */}
          <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 flex justify-between items-center shadow-md">
            <Link
              href="/main"
              className="flex items-center gap-3 focus:outline-none"
              aria-label="Go to main app"
              prefetch={false}
            >
              <span className="text-2xl">🧠</span>
              <h1 className="text-2xl font-bold">Homework AI</h1>
            </Link>
            <div className="flex items-center gap-6">
              <span className="text-sm md:text-base text-white/90">
                Your Intelligent Study Assistant
              </span>
              {/* Chat Button */}
              <Link
                href="/chat"
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-bold shadow hover:scale-105 transition"
              >
                💬 Chat
              </Link>
              {/* Pricing Button */}
              <Link
                href="/pricing"
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-lg font-bold shadow hover:scale-105 transition"
              >
                💎 Pricing
              </Link>
              {/* Study Tools Button */}
              <Link
                href="/study-tools"
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-lg font-bold shadow hover:scale-105 transition"
              >
                🧰 Study Tools
              </Link>
              {/* Show Profile link and avatar only when signed in */}
              <SignedIn>
                <Link href="/profile" className="text-white underline mr-2">Profile</Link>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              {/* Show sign in/up when signed out */}
              <SignedOut>
                <AuthButtons />
              </SignedOut>
            </div>
          </header>
          {/* Main content with top margin to avoid header overlap */}
          <main className="max-w-7xl mx-auto px-4 py-10 mt-20">
            {children}
          </main>
          <FooterSection />
<BackToTopButton />
        </body>
      </html>
    </ClerkProvider>
  )
}