'use client';
import { useState } from 'react';
import ExportPDFButton from './ExportPDFButton';
import ExportCSVButton from './ExportCSVButton';

type Flashcard = { q: string; a: string };

export default function FlashcardGenerator() {
  const [input, setInput] = useState('');
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    setFlashcards([]);

    try {
      const res = await fetch('/api/flashcard-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });

      const data = await res.json();
      if (data.flashcards) {
        const lines: string[] = data.flashcards.join('\n').split('\n').filter((line: string) => line.trim() !== '');
        const cards: Flashcard[] = [];

        for (let i = 0; i < lines.length; i += 2) {
          const q = lines[i]?.replace(/^Q:\s*/i, '').trim() || '';
          const a = lines[i + 1]?.replace(/^A:\s*/i, '').trim() || '';
          if (q && a) cards.push({ q, a });
        }

        setFlashcards(cards);
      } else {
        setError('Failed to generate flashcards.');
      }
    } catch {
      setError('Error generating flashcards.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold mb-4">AI Flashcard Generator</h2>

      <form onSubmit={handleGenerate} className="bg-white p-6 shadow rounded space-y-4">
        <textarea
          rows={4}
          placeholder="Paste a topic, passage, or notes..."
          className="w-full border border-gray-300 p-2 rounded resize-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Flashcards'}
        </button>

        {error && <p className="text-red-600">{error}</p>}
      </form>

      {flashcards.length > 0 && (
        <div className="mt-6 flex gap-4">
          <ExportPDFButton
            content={flashcards.map(f => `Q: ${f.q}\nA: ${f.a}`).join('\n\n')}
            filename="flashcards.pdf"
          />
          <ExportCSVButton data={flashcards} filename="flashcards.csv" />
        </div>
      )}

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {flashcards.map((f, i) => (
          <div key={i} className="bg-blue-50 p-4 rounded shadow border">
            <p><strong>Q:</strong> {f.q}</p>
            <p className="text-green-700 mt-1"><strong>A:</strong> {f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}