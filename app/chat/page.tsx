'use client'
import { useRef, useState } from "react"

type Message = {
  role: "user" | "ai"
  content: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when new message
  const scrollToBottom = () => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim()) return
    const userMsg: Message = { role: "user", content: input }
    setMessages((msgs) => [...msgs, userMsg])
    setInput("")
    setLoading(true)
    scrollToBottom()

    // Call your AI API
    const res = await fetch("/api/ai-answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: input }),
    })
    const data = await res.json()
    setMessages((msgs) => [
      ...msgs,
      { role: "ai", content: data.answer || "Sorry, I couldn't answer that." },
    ])
    setLoading(false)
    scrollToBottom()
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-2xl mx-auto w-full flex flex-col flex-1 pt-8 pb-4">
        <h1 className="text-3xl font-bold text-center mb-6">Homework AI Chat</h1>
        <div className="flex-1 overflow-y-auto bg-white rounded-xl shadow p-6 mb-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-gray-400 text-center">Ask me anything about your homework!</div>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-[80%] whitespace-pre-line ${
                  msg.role === "user"
                    ? "bg-blue-100 text-blue-900"
                    : "bg-purple-100 text-purple-900"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="px-4 py-2 rounded-lg bg-purple-100 text-purple-900 animate-pulse">
                AI is thinking...
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        <form
          onSubmit={sendMessage}
          className="flex gap-2"
        >
          <input
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type your question and press Enter..."
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold px-6 py-2 rounded-lg shadow hover:scale-105 transition"
            disabled={loading || !input.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}