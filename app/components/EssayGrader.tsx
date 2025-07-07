'use client'
import { useState } from "react";

export default function EssayGrader() {
  const [input, setInput] = useState("");
  const [grade, setGrade] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGrade(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setGrade("");
    try {
      const res = await fetch("/api/ai-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: `Grade this essay out of 10 and give a short constructive comment:\n${input}`,
          style: "Essay Grader"
        }),
      });
      const data = await res.json();
      setGrade(data.answer || "Sorry, could not grade.");
    } catch (err) {
      setError("Failed to grade essay.");
    }
    setLoading(false);
  }

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold mb-4">AI Essay Grader</h2>
      <form onSubmit={handleGrade} className="bg-white rounded-xl shadow p-8 max-w-2xl mx-auto space-y-4">
        <textarea
          className="w-full border border-gray-300 rounded-md p-2 min-h-[80px]"
          placeholder="Paste your essay here..."
          value={input}
          onChange={e => setInput(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold px-6 py-2 rounded-lg shadow hover:scale-105 transition"
          disabled={loading}
        >
          {loading ? "Grading..." : "Grade Essay"}
        </button>
        {error && <div className="text-red-500">{error}</div>}
        {grade && (
          <div className="mt-6 bg-green-50 rounded p-4 shadow text-gray-800 whitespace-pre-line">
            {grade}
          </div>
        )}
      </form>
    </section>
  );
}