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
  const [file, setFile] = useState<File | null>(null)
  const [ai, setAI] = useState<any>(null)

  // 1. Handle file upload (PDF or image)
  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setFile(file)
    setLoading(true)
    setError('')
    setInput('')
    setSummary('')
    setFlashcards([])
    setMcqs([])
    setQuestions([])
    setWarning('')

    if (file.type === "application/pdf") {
      // PDF: send to backend
      const formData = new FormData()
      formData.append('file', file)
      try {
        const res = await fetch('https://homework-ai-final-production.up.railway.app/extract', {
          method: 'POST',
          body: formData
        })
        const data = await res.json()
        if (!data.text) {
          setError('Failed to extract text from PDF.')
          setLoading(false)
          return
        }
        setInput(data.text)
        setWarning('')
      } catch (e) {
        setError('Failed to extract text from PDF.')
      }
      setLoading(false)
    } else if (file.type.startsWith("image/")) {
      // IMAGE: OCR in browser
      setWarning('Extracting text from image (OCR)...')
      try {
        const { createWorker } = await import('tesseract.js')
        const worker = await createWorker('eng')
        const { data: { text: ocrText } } = await worker.recognize(file)
        setInput(ocrText)
        setWarning('')
      } catch (e) {
        setError('Failed to extract text from image.')
        setWarning('')
      }
      setLoading(false)
    } else {
      setError('Unsupported file type.')
      setLoading(false)
    }
  }

  // 2. Generate Study Pack (summary, questions, flashcards, MCQs)
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
      setAI(data)
    } catch (err) {
      setError('Failed to generate study pack.')
    } finally {
      setLoading(false)
    }
  }

  // Export functions
  function exportText() {
    const blob = new Blob([input], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = (file?.name || 'extracted') + '.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  function exportFlashcardsCSV() {
    if (!flashcards.length) return
    const csv = "Question,Answer\n" + flashcards.map(f => `"${f.q.replace(/"/g, '""')}","${f.a.replace(/"/g, '""')}"`).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = (file?.name || 'flashcards') + '.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  function exportMCQsCSV() {
    if (!mcqs.length) return
    const csv = "Question,Option A,Option B,Option C,Option D,Answer\n" +
      mcqs.map(m =>
        `"${m.question.replace(/"/g, '""')}","${m.options[0]}","${m.options[1]}","${m.options[2]}","${m.options[3]}","${m.answer}"`
      ).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = (file?.name || 'mcqs') + '.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  // Quiz Mode for MCQs
  function QuizMode({ mcqs }: { mcqs: { question: string, options: string[], answer: string }[] }) {
    const [current, setCurrent] = useState(0)
    const [selected, setSelected] = useState<string | null>(null)
    const [score, setScore] = useState(0)
    const [showResult, setShowResult] = useState(false)

    if (!mcqs.length) return null

    function handleSelect(opt: string) {
      setSelected(opt)
      if (opt === mcqs[current].answer) setScore(score + 1)
    }

    function next() {
      setSelected(null)
      if (current < mcqs.length - 1) setCurrent(current + 1)
      else setShowResult(true)
    }

    return (
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">Quiz Mode</h3>
        {showResult ? (
          <div className="p-4 bg-green-100 rounded font-semibold">
            Quiz complete! Your score: {score} / {mcqs.length}
          </div>
        ) : (
          <div className="bg-white border rounded p-4 shadow-sm">
            <div className="font-semibold mb-2">{current + 1}. {mcqs[current].question}</div>
            <ul>
              {mcqs[current].options.map((opt, i) => (
                <li key={i}>
                  <button
                    className={`px-3 py-1 rounded mb-1 mr-2 border ${selected === opt ? (opt === mcqs[current].answer ? 'bg-green-200' : 'bg-red-200') : 'bg-gray-100'}`}
                    disabled={!!selected}
                    onClick={() => handleSelect(opt)}
                  >
                    {String.fromCharCode(65 + i)}. {opt}
                  </button>
                </li>
              ))}
            </ul>
            {selected && (
              <button className="mt-2 px-4 py-1 bg-blue-600 text-white rounded" onClick={next}>
                {current < mcqs.length - 1 ? 'Next' : 'Finish'}
              </button>
            )}
          </div>
        )}
      </div>
    )
  }

  // Flashcard Review
  function FlashcardReview({ flashcards }: { flashcards: { q: string, a: string }[] }) {
    const [current, setCurrent] = useState(0)
    const [showAnswer, setShowAnswer] = useState(false)
    const [known, setKnown] = useState<number[]>([])

    if (!flashcards.length) return null

    function markKnown() {
      setKnown([...known, current])
      next()
    }

    function next() {
      setShowAnswer(false)
      setCurrent((current + 1) % flashcards.length)
    }

    return (
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">Flashcard Review</h3>
        <div className="bg-white border rounded p-4 shadow-sm text-center">
          <div className="font-semibold text-blue-700 mb-2">Q: {flashcards[current].q}</div>
          {showAnswer ? (
            <div className="text-green-700 mb-2">A: {flashcards[current].a}</div>
          ) : (
            <button className="px-4 py-1 bg-blue-600 text-white rounded" onClick={() => setShowAnswer(true)}>
              Show Answer
            </button>
          )}
          {showAnswer && (
            <div className="mt-2 flex gap-2 justify-center">
              <button className="px-3 py-1 bg-green-500 text-white rounded" onClick={markKnown}>I knew it</button>
              <button className="px-3 py-1 bg-gray-300 rounded" onClick={next}>Next</button>
            </div>
          )}
          <div className="mt-2 text-xs text-gray-500">
            {known.length} / {flashcards.length} marked as known
          </div>
        </div>
      </div>
    )
  }

  // Ask AI Q&A
  function AskAI({ text }: { text: string }) {
    const [q, setQ] = useState('')
    const [answer, setAnswer] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleAsk(e: React.FormEvent) {
      e.preventDefault()
      setLoading(true)
      setAnswer('')
      const res = await fetch('/api/pdf-analyzer/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, question: q })
      })
      const data = await res.json()
      setAnswer(data.answer)
      setLoading(false)
    }

    return (
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">Ask AI about this PDF</h3>
        <form onSubmit={handleAsk} className="flex gap-2 mb-2">
          <input
            className="flex-1 border px-3 py-1 rounded"
            placeholder="Ask any question about this PDF..."
            value={q}
            onChange={e => setQ(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-4 py-1 rounded" disabled={loading || !q}>
            {loading ? 'Asking...' : 'Ask'}
          </button>
        </form>
        {answer && <div className="bg-gray-50 p-2 rounded">{answer}</div>}
      </div>
    )
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
        <label className="cursor-pointer bg-gray-100 px-4 py-2 border rounded hover:bg-gray-200 transition">
          📄 Upload PDF or Image
          <input type="file" accept="application/pdf,image/*" hidden onChange={handleFileChange} />
        </label>
        <button
          onClick={generatePack}
          disabled={loading}
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition disabled:opacity-50"
        >
          {loading ? 'Generating...' : '✨ Generate Study Pack'}
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={exportText}
          disabled={!input}
        >
          Export Text
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          onClick={exportFlashcardsCSV}
          disabled={!flashcards.length}
        >
          Export Flashcards (CSV)
        </button>
        <button
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
          onClick={exportMCQsCSV}
          disabled={!mcqs.length}
        >
          Export MCQs (CSV)
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
        </section>
      )}

      {/* Quiz Mode */}
      {mcqs.length > 0 && <QuizMode mcqs={mcqs} />}

      {/* Flashcard Review */}
      {flashcards.length > 0 && <FlashcardReview flashcards={flashcards} />}

      {/* Ask AI Q&A */}
      {input && <AskAI text={input} />}
    </div>
  )
}