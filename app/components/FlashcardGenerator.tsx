'use client'

import { useState } from 'react'
import ExportPDFButton from './ExportPDFButton'
import ExportCSVButton from './ExportCSVButton'

type Flashcard = { q: string; a: string }

export default function FlashcardGenerator() {
  const [input, setInput] = useState('')
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleGenerate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!input.trim()) return
    setLoading(true)
    setError(null)
    setFlashcards([])

    try {
      const res = await fetch('/api/flashcard-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      })
      const data = await res.json()
      if (data.flashcards) {
        // Improved parsing logic
        const cards: Flashcard[] = []
        const lines = data.flashcards.join('\n').split('\n').filter((line: string) => line.trim() !== '')

        for (let i = 0; i < lines.length; i += 2) {
          const q = lines[i]?.replace(/^Q:\s*/i, '').trim() || ''
          const a = lines[i + 1]?.replace(/^A:\s*/i, '').trim() || ''
          if (q && a) cards.push({ q, a })
        }
        setFlashcards(cards)
      } else {
        setError('Failed to generate flashcards.')
      }
    } catch {
      setError('Error generating flashcards.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold mb-4">AI Flashcard Generator</h2>
      <form onSubmit={handleGenerate} className="bg-white rounded-xl shadow p-8 max-w-2xl mx-auto space-y-4">
        <textarea
          rows={4}
          placeholder="Paste a topic, passage, or notes (e.g. 'Photosynthesis' or a paragraph from your textbook)"
          className="w-full border border-gray-300 rounded p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Flashcards'}
        </button>

        {error && <p className="text-red-600">{error}</p>}

        {flashcards.length > 0 && (
          <>
            <div className="flex items-center gap-4 mb-4">
              <ExportPDFButton
                content={flashcards.map(f => `Q: ${f.q}\nA: ${f.a}`).join('\n\n')}
                filename="flashcards.pdf"
              />
              <ExportCSVButton data={flashcards} filename="flashcards.csv" />
            </div>
            <div className="space-y-3">
              {flashcards.map((card, i) => (
                <div key={i} className="bg-blue-50 rounded p-4 shadow">
                  <p className="font-semibold text-blue-800">Q: {card.q}</p>
                  <p className="text-green-700">A: {card.a}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </form>
    </section>
  )
}