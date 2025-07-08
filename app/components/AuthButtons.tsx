'use client'
import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default function AuthButtons() {
  return (
    <div className="flex gap-2">
      <SignInButton mode="modal">
        <span className="font-semibold underline cursor-pointer hover:text-blue-200">Sign In</span>
      </SignInButton>
      <SignUpButton mode="modal">
        <span className="font-semibold underline cursor-pointer hover:text-blue-200">Sign Up</span>
      </SignUpButton>
    </div>
  );
}