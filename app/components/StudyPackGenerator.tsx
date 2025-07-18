'use client'
import { useState } from 'react'
import ExportCSVButton from './ExportCSVButton'
import ExportPDFButton from './ExportPDFButton'

export default function StudyPackGenerator() {
  const [input, setInput] = useState('')
  const [summary, setSummary] = useState('')
  const [flashcards, setFlashcards] = useState<{ q: string, a: string }[]>([])
  const [mcqs, setMcqs] = useState<{ question: string, options: string[], answer: string }[]>([])
  const [questions, setQuestions] = useState<string[]>([])
  const [warning, setWarning] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function generatePack() {
    if (!input.trim()) return
    setLoading(true)
    setError('')
    setSummary('')
    setFlashcards([])
    setMcqs([])
    setQuestions([])
    setWarning('')

    const maxChars = 8000
    const limitedText = input.length > maxChars ? input.slice(0, maxChars) : input
    if (input.length > maxChars) {
      setWarning('⚠️ Only the first 8000 characters were analyzed due to AI limits.')
    }

    try {
      const res = await fetch('/api/pdf-analyzer/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: limitedText }),
      })
      const data = await res.json()
      setSummary(data.summary || '')
      setFlashcards(data.flashcards || [])
      setMcqs(data.mcqs || [])
      setQuestions(data.questions || [])
      setWarning(data.warning || '')
    } catch (err) {
      setError('Failed to generate study pack.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">🧑‍🎓 Study Pack Generator</h1>
      <p className="text-gray-600 mb-8">
        Paste your notes, textbook, or upload a PDF or image to automatically generate AI-powered study tools.
      </p>
      <textarea
        className="w-full border border-gray-300 rounded p-3 mb-4 text-sm"
        rows={6}
        placeholder="Paste your textbook, lecture, or notes..."
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={generatePack}
          disabled={loading}
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition disabled:opacity-50"
        >
          {loading ? 'Generating...' : '✨ Generate Study Pack'}
        </button>
      </div>
      {warning && (
        <p className="text-yellow-800 bg-yellow-100 p-2 rounded text-sm mb-4">{warning}</p>
      )}
      {error && <p className="text-red-600">{error}</p>}

      {summary && (
        <section className="mb-6">
          <h3 className="text-xl font-bold mb-2">Summary</h3>
          <div className="bg-gray-50 p-4 rounded whitespace-pre-wrap">{summary}</div>
          <ExportPDFButton content={summary} filename="summary.pdf" />
        </section>
      )}

      {questions.length > 0 && (
        <section className="mb-6">
          <h3 className="text-xl font-bold mb-2">Questions</h3>
          <ul className="list-disc ml-6">
            {questions.map((q, i) => <li key={i}>{q}</li>)}
          </ul>
        </section>
      )}

      {flashcards.length > 0 && (
        <section className="mb-6">
          <h3 className="text-xl font-bold mb-2">Flashcards</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {flashcards.map((f, i) => (
              <div key={i} className="bg-blue-50 p-3 rounded shadow border">
                <p className="font-semibold text-blue-700">Q: {f.q}</p>
                <p className="text-green-700 mt-1">A: {f.a}</p>
              </div>
            ))}
          </div>
          <ExportCSVButton data={flashcards} filename="flashcards.csv" />
        </section>
      )}

      {mcqs.length > 0 && (
        <section className="mb-6">
          <h3 className="text-xl font-bold mb-2">MCQs</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {mcqs.map((mcq, i) => (
              <div key={i} className="bg-white border rounded p-3 shadow-sm">
                <div className="font-semibold text-blue-700 mb-1">{i + 1}. {mcq.question}</div>
                <ul className="mb-1">
                  {mcq.options.map((opt, j) => (
                    <li key={j} className={opt === mcq.answer ? "text-green-600 font-bold" : ""}>
                      {String.fromCharCode(65 + j)}. {opt}
                    </li>
                  ))}
                </ul>
                <div className="text-green-700">Answer: {mcq.answer}</div>
              </div>
            ))}
          </div>
          <ExportCSVButton
            data={mcqs.map(m => ({
              question: m.question,
              A: m.options[0],
              B: m.options[1],
              C: m.options[2],
              D: m.options[3],
              answer: m.answer
            }))}
            filename="mcqs.csv"
          />
        </section>
      )}
    </div>
  )
}