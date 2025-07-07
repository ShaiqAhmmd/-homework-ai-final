'use client'
import { useState } from "react";

export default function FeedbackForm() {
  const [input, setInput] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: "Feedback User",
          email: "feedback@homeworkai.com",
          subject: "Feedback",
          message: input,
        }),
      });
      if (res.ok) {
        setSent(true);
        setInput("");
      } else {
        alert("Failed to send feedback.");
      }
    } catch {
      alert("Failed to send feedback.");
    }
    setLoading(false);
  }

  return (
    <section className="py-8">
      <h3 className="text-xl font-bold mb-2">What should we build next?</h3>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="border border-gray-300 rounded px-3 py-2 flex-1"
          placeholder="Your idea or feedback..."
          value={input}
          onChange={e => setInput(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded font-bold"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
      {sent && <div className="text-green-600 mt-2">Thank you for your feedback!</div>}
    </section>
  );
}