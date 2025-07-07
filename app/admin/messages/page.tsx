'use client'
import { useState } from "react"

export default function AdminMessagesPage() {
  const [access, setAccess] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Change this to your secret password!
  const ADMIN_PASSWORD = "!amDea6ly"

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (input === ADMIN_PASSWORD) {
      setAccess(true)
      setError("")
      setLoading(true)
      // Fetch messages from a public API route
      const res = await fetch("/api/contact-messages")
      const data = await res.json()
      setMessages(data.messages || [])
      setLoading(false)
    } else {
      setError("Incorrect password.")
    }
  }

  if (!access) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow max-w-xs w-full">
          <h2 className="text-xl font-bold mb-4">Admin Access</h2>
          <input
            type="password"
            className="w-full border border-gray-300 rounded p-2 mb-2"
            placeholder="Enter admin password"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition"
          >
            Login
          </button>
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </form>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Contact Messages</h1>
      {loading && <div>Loading...</div>}
      {messages.length === 0 && !loading && <div>No messages yet.</div>}
      <ul className="space-y-4">
        {messages.map((msg: any) => (
          <li key={msg._id} className="bg-white rounded shadow p-4">
            <div className="text-gray-600 text-sm mb-1">{new Date(msg.createdAt).toLocaleString()}</div>
            <div><b>Name:</b> {msg.name}</div>
            <div><b>Email:</b> {msg.email}</div>
            <div><b>Subject:</b> {msg.subject}</div>
            <div className="mt-2"><b>Message:</b> {msg.message}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}