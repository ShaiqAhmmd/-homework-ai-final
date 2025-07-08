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
          <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 sm:px-8 py-2 flex justify-between items-center shadow-md">
  <div className="flex items-center gap-2 sm:gap-3">
    <span className="text-xl sm:text-2xl">🧠</span>
    <h1 className="text-lg sm:text-2xl font-bold whitespace-nowrap">Homework AI</h1>
  </div>
  <nav className="flex items-center gap-3 sm:gap-6 overflow-x-auto scrollbar-none">
    <a href="/chat" className="font-semibold hover:underline underline-offset-4 transition whitespace-nowrap">Chat</a>
    <a href="/pricing" className="font-semibold hover:underline underline-offset-4 transition whitespace-nowrap">Pricing</a>
    <a href="/study-tools" className="font-semibold hover:underline underline-offset-4 transition whitespace-nowrap">Study Tools</a>
    <SignedIn>
      <a href="/profile" className="font-semibold hover:underline underline-offset-4 transition whitespace-nowrap">Profile</a>
      <UserButton afterSignOutUrl="/" />
    </SignedIn>
    <SignedOut>
      <AuthButtons />
    </SignedOut>
  </nav>
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