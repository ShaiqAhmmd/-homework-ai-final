'use client'
import { useState } from 'react'

export default function PDFAnalyzerPage() {
  const [file, setFile] = useState<File | null>(null)
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [ai, setAI] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  // 1. Handle file upload and extraction
  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setFile(file)
    setLoading(true)
    setError(null)
    setAI(null)
    setText('')

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

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6">PDF Analyzer</h1>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleUpload}
        className="mb-4"
      />
      {loading && <div className="mb-4 text-blue-600">Extracting text from PDF...</div>}
      {error && <div className="mb-4 text-red-600">{error}</div>}
      {file && <div className="mb-2 text-gray-700">Choose file {file.name}</div>}
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
          <div className="mb-6">
            <h2 className="font-semibold mb-2">Keywords</h2>
            {ai.keywords?.length ? (
              <div className="flex flex-wrap gap-2">
                {ai.keywords.map((k: string, i: number) => (
                  <span key={i} className="px-2 py-1 bg-blue-100 rounded text-blue-800 text-sm">{k}</span>
                ))}
              </div>
            ) : (
              <div className="text-gray-400">No keywords found.</div>
            )}
          </div>
          <div className="mb-6">
            <h2 className="font-semibold mb-2">Subject</h2>
            <span className="px-3 py-1 bg-green-100 rounded text-green-800">{ai.subject}</span>
          </div>
        </>
      )}
    </div>
  )
}