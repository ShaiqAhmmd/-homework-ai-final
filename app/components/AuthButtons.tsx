'use client'
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

export default function AuthButtons() {
  return (
    <div className="flex items-center gap-2">
      <SignedOut>
        <SignInButton mode="modal">
          <button className="bg-blue-500 text-white px-4 py-1 rounded mr-2">Sign In</button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button className="bg-gray-200 text-gray-800 px-4 py-1 rounded">Sign Up</button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </div>
  );
}