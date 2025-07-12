import { ClerkProvider } from '@clerk/nextjs'
import FooterSection from './components/FooterSection'
import AuthButtons from './components/AuthButtons'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import HeaderSection from './components/HeaderSection'
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
          <main className="max-w-7xl mx-auto px-4 py-10 mt-20">
            {children}
          </main>
          <FooterSection />
          <HeaderSection />
        </body>
      </html>
    </ClerkProvider>
  )
}