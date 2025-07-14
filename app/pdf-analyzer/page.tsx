'use client'
import { useState } from 'react'
import { Download, FileText, Upload } from 'lucide-react' // optional: for icons

export default function PDFAnalyzerPage() {
  const [file, setFile] = useState<File | null>(null)
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [ai, setAI] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [flashcards, setFlashcards] = useState<{ q: string, a: string }[]>([])

  // Demo/sample PDFs (add your own or use public links)
  const samplePDFs = [
    {
      name: "Physics Notes Sample",
      url: "https://arxiv.org/pdf/quant-ph/0410100.pdf"
    },
    {
      name: "Chemistry Sample",
      url: "https://chem.libretexts.org/@api/deki/files/183/Chapter_1.pdf"
    }
  ]

  // 1. Handle file upload and extraction
  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setFile(file)
    setLoading(true)
    setError(null)
    setAI(null)
    setText('')
    setFlashcards([])

    // 1. Upload to your Railway backend
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
      setText(data.text)
      // 2. Send extracted text to your AI backend as before
      const res2 = await fetch('/api/pdf-analyzer/analyze', {
        method: 'POST',
        body: JSON.stringify({ text: data.text }),
        headers: { 'Content-Type': 'application/json' }
      })
      setAI(await res2.json())
    } catch (e) {
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  // 2. Handle sample PDF "Browse" button
  async function handleSample(url: string) {
    setLoading(true)
    setError(null)
    setAI(null)
    setText('')
    setFlashcards([])
    // Download the PDF and send to backend
    const res = await fetch(url)
    const blob = await res.blob()
    const file = new File([blob], url.split('/').pop() || 'sample.pdf', { type: 'application/pdf' })
    setFile(file)
    await handleUpload({ target: { files: [file] } } as any)
  }

  // 3. Export to TXT
  function exportText() {
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = (file?.name || 'extracted') + '.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  // 4. Export to CSV (for flashcards)
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

  // 5. Generate flashcards from PDF topic/content
  async function generateFlashcards() {
    if (!text) return
    setLoading(true)
    setFlashcards([])
    try {
      const res = await fetch('/api/study-quiz-generator', {
        method: 'POST',
        body: JSON.stringify({
          text,
          type: 'flashcards',
        }),
        headers: { 'Content-Type': 'application/json' }
      })
      const data = await res.json()
      setFlashcards(data.flashcards || [])
    } catch (e) {
      setError('Failed to generate flashcards.')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      {/* Description */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold mb-2">📄 PDF Analyzer</h1>
        <p className="text-gray-600 mb-4">
          Instantly extract summaries, questions, and generate flashcards from any textbook, assignment, or notes PDF. 
          <span className="block text-blue-600 font-semibold">Save hours of study time with AI-powered insights!</span>
        </p>
        <div className="flex flex-wrap gap-2 justify-center mb-2">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
            onClick={() => document.getElementById('pdf-upload')?.click()}
          >
            <Upload size={18} /> Upload PDF
          </button>
          <input
            id="pdf-upload"
            type="file"
            accept="application/pdf"
            onChange={handleUpload}
            className="hidden"
          />
          <button
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded shadow hover:bg-purple-700 transition"
            onClick={exportText}
            disabled={!text}
          >
            <FileText size={18} /> Export Text
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition"
            onClick={exportFlashcardsCSV}
            disabled={!flashcards.length}
          >
            <Download size={18} /> Export Flashcards (CSV)
          </button>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {samplePDFs.map((pdf) => (
            <button
              key={pdf.url}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm font-medium"
              onClick={() => handleSample(pdf.url)}
            >
              Browse: {pdf.name}
            </button>
          ))}
        </div>
      </div>

      {loading && <div className="mb-4 text-blue-600">Extracting text from PDF or generating flashcards...</div>}
      {error && <div className="mb-4 text-red-600">{error}</div>}
      {file && <div className="mb-2 text-gray-700">File: {file.name}</div>}
      {text && (
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Extracted Text (first 500 chars):</h2>
          <div className="bg-gray-50 p-2 rounded text-xs max-h-40 overflow-y-auto">
            {text.slice(0, 500)}{text.length > 500 && '...'}
          </div>
        </div>
      )}
      {ai?.warning && (
        <div className="mb-4 p-2 bg-yellow-100 text-yellow-800 rounded font-semibold">
          {ai.warning}
        </div>
      )}
      {ai && (
        <>
          <div className="mb-6">
            <h2 className="font-semibold mb-2">Summary</h2>
            <div className="bg-gray-50 p-2 rounded">{ai.summary}</div>
          </div>
          <div className="mb-6">
            <h2 className="font-semibold mb-2">Questions</h2>
            {ai.questions?.length ? (
              <ul className="list-disc ml-6">
                {ai.questions.map((q: string, i: number) => <li key={i}>{q}</li>)}
              </ul>
            ) : (
              <div className="text-gray-400">No questions found.</div>
            )}
          </div>
          {/* Flashcard Generator */}
          <div className="mb-6">
            <h2 className="font-semibold mb-2 flex items-center gap-2">
              Flashcards
              <button
                className="ml-2 px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition"
                onClick={generateFlashcards}
                disabled={loading || !text}
              >
                Generate Flashcards
              </button>
            </h2>
            {flashcards.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {flashcards.map((f, i) => (
                  <div key={i} className="bg-white border rounded p-3 shadow-sm">
                    <div className="font-semibold text-blue-700 mb-1">Q: {f.q}</div>
                    <div className="text-gray-700">A: {f.a}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-400">No flashcards generated yet.</div>
            )}
          </div>
        </>
      )}
    </div>
  )
}