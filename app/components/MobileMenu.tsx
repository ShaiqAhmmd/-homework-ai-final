'use client'
import { Menu } from '@headlessui/react'
import Link from 'next/link'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import AuthButtons from './AuthButtons'

export default function MobileMenu() {
  return (
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
  )
}  