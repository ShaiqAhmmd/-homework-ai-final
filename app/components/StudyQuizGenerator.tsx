'use client'

import { useState } from 'react'
import ExportPDFButton from './ExportPDFButton'
import ExportCSVButton from './ExportCSVButton'

type QuizQuestion = {
  question: string
  options: string[]
  answer: string
}

export default function StudyQuizGenerator() {
  const [input, setInput] = useState('')
  const [quiz, setQuiz] = useState<QuizQuestion[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function generateQuiz() {
    if (!input.trim()) return
    setLoading(true)
    setError(null)
    setQuiz([])

    try {
      const res = await fetch('/api/study-quiz-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      })
      const data = await res.json()
      if (data.quiz) {
        setQuiz(data.quiz)
      } else {
        setError('Failed to generate quiz.')
      }
    } catch {
      setError('Error generating quiz.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold mb-4">AI Study Quiz Generator</h2>
      <textarea
        rows={4}
        placeholder="Enter a topic or passage to generate quiz questions..."
        className="w-full border border-gray-300 rounded p-2 mb-4"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={generateQuiz}
        disabled={loading || !input.trim()}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Generate Quiz'}
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {quiz.length > 0 && (
        <div className="mt-6 space-y-6">
          {quiz.map((q, i) => (
            <div key={i} className="border p-4 rounded">
              <p className="font-semibold">{i + 1}. {q.question}</p>
              <ul className="list-disc list-inside mt-2">
                {q.options.map((opt, idx) => (
                  <li key={idx} className={opt === q.answer ? 'font-bold text-green-600' : ''}>
                    {opt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}