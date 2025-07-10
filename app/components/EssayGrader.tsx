'use client'

import { useState } from 'react'
import ExportPDFButton from './ExportPDFButton'
import ExportCSVButton from './ExportCSVButton'

export default function EssayGrader() {
  const [input, setInput] = useState('')
  const [feedback, setFeedback] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleGrade(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!input.trim()) return
    setLoading(true)
    setError(null)
    setFeedback('')

    try {
      const res = await fetch('/api/essay-grader', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ essay: input }),
      })
      const data = await res.json()
      if (data.feedback) {
        setFeedback(data.feedback)
      } else {
        setError('Failed to grade essay.')
      }
    } catch {
      setError('Error grading essay.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold mb-4">AI Essay Grader</h2>
      <form onSubmit={handleGrade} className="bg-white rounded-xl shadow p-8 max-w-2xl mx-auto space-y-4">
        <textarea
          rows={6}
          placeholder="Paste your essay here..."
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
          {loading ? 'Grading...' : 'Grade Essay'}
        </button>

        {error && <p className="text-red-600">{error}</p>}

        {feedback && (
          <>
            <div className="flex items-center gap-4 mb-4">
              <ExportPDFButton content={feedback} filename="essay-feedback.pdf" />
              <ExportCSVButton data={[{ feedback }]} filename="essay-feedback.csv" />
            </div>
            <div className="bg-gray-100 p-4 rounded whitespace-pre-line">{feedback}</div>
          </>
        )}
      </form>
    </section>
  )
}