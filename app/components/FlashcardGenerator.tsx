'use client'
import { useState } from "react";

type Flashcard = { q: string; a: string };

export default function FlashcardGenerator() {
  const [input, setInput] = useState("");
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGenerate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setFlashcards([]);
    try {
      const res = await fetch("/api/ai-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: `Generate 5 study flashcards (question and answer pairs) for this topic or passage:\n${input}\nFormat as:\nQ: ...\nA: ...\nQ: ...\nA: ...`,
          style: "Flashcard Generator"
        }),
      });
      const data = await res.json();
      // Parse the AI response into flashcards
      const cards: Flashcard[] = [];
      const regex = /Q:\s*([\s\S]*?)\s*A:\s*([\s\S]*?)(?=Q:|$)/gi;
      let match: RegExpExecArray | null;
      while ((match = regex.exec(data.answer || "")) !== null) {
        cards.push({ q: match[1].trim(), a: match[2].trim() });
      }
      setFlashcards(cards);
    } catch (err) {
      setError("Failed to generate flashcards.");
      // Optionally log the error for debugging:
      // console.error(err);
    }
    setLoading(false);
  }

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold mb-4">AI Flashcard Generator</h2>
      <form onSubmit={handleGenerate} className="bg-white rounded-xl shadow p-8 max-w-2xl mx-auto space-y-4">
        <textarea
          className="w-full border border-gray-300 rounded-md p-2 min-h-[80px]"
          placeholder="Paste a topic, passage, or notes (e.g. 'Photosynthesis' or a paragraph from your textbook)"
          value={input}
          onChange={e => setInput(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold px-6 py-2 rounded-lg shadow hover:scale-105 transition"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Flashcards"}
        </button>
        {error && <div className="text-red-500">{error}</div>}
        {flashcards.length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="font-semibold mb-2">Flashcards:</h3>
            {flashcards.map((card, i) => (
              <div key={i} className="bg-blue-50 rounded p-3 shadow">
                <div className="font-bold text-blue-800">Q: {card.q}</div>
                <div className="text-green-700">A: {card.a}</div>
              </div>
            ))}
          </div>
        )}
      </form>
    </section>
  );
}