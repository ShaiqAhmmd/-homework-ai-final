'use client'
import { useState } from "react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import AuthButtons from "./AuthButtons";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        className="text-2xl px-2 py-1 rounded hover:bg-white/20 transition"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open menu"
      >
        ⋯
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white text-gray-900 rounded shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <Link href="/chat" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpen(false)}>Chat</Link>
          <Link href="/pricing" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpen(false)}>Pricing</Link>
          <Link href="/study-tools" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpen(false)}>Study Tools</Link>
          <SignedIn>
            <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpen(false)}>Profile</Link>
            <div className="px-4 py-2"><UserButton afterSignOutUrl="/" /></div>
          </SignedIn>
          <SignedOut>
            <div className="px-4 py-2"><AuthButtons /></div>
          </SignedOut>
        </div>
      )}
    </div>
  );
}