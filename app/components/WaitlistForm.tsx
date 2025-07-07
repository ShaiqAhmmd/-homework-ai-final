'use client'
import { useState } from "react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setLoading(true);
  try {
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: "Waitlist User",
        email,
        subject: "Waitlist",
        message: "User wants to join the Pro waitlist.",
      }),
    });
    setSent(true);
    setEmail("");
  } catch {
    alert("Failed to join waitlist.");
  }
  setLoading(false);
}

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-xl mx-auto mt-6">
      <input
        type="email"
        required
        placeholder="Your email address"
        className="rounded-md px-4 py-2 text-gray-900 w-full sm:w-auto"
        value={email}
        onChange={e => setEmail(e.target.value)}
        disabled={loading || sent}
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-600 transition"
        disabled={loading || sent}
      >
        {sent ? "Added!" : loading ? "Joining..." : "Join Waitlist"}
      </button>
      {sent && <span className="text-green-600 ml-2">Thank you!</span>}
    </form>
  );
}