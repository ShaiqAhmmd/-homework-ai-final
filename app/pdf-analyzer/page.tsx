'use client'
import { useState } from 'react'

export default function PDFAnalyzerPage() {
  const [file, setFile] = useState<File | null>(null)
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [ai, setAI] = useState<any>(null)

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setFile(file)
    setLoading(true)

    // 1. Upload to your Railway backend
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch('https://homework-ai-final-production.up.railway.app/extract', {
      method: 'POST',
      body: formData
    })
    const data = await res.json()
    setText(data.text)
    setLoading(false)

    // 2. Send extracted text to your AI backend as before
    const res2 = await fetch('/api/pdf-analyzer/analyze', {
      method: 'POST',
      body: JSON.stringify({ text: data.text }),
      headers: { 'Content-Type': 'application/json' }
    })
    setAI(await res2.json())
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
      {text && (
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Extracted Text (first 500 chars):</h2>
          <div className="bg-gray-50 p-2 rounded text-xs max-h-40 overflow-y-auto">
            {text.slice(0, 500)}{text.length > 500 && '...'}
          </div>
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
            <ul className="list-disc ml-6">
              {ai.questions?.map((q: string, i: number) => <li key={i}>{q}</li>)}
            </ul>
          </div>
          <div className="mb-6">
            <h2 className="font-semibold mb-2">Keywords</h2>
            <div className="flex flex-wrap gap-2">
              {ai.keywords?.map((k: string, i: number) => (
                <span key={i} className="px-2 py-1 bg-blue-100 rounded text-blue-800 text-sm">{k}</span>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <h2 className="font-semibold mb-2">Subject</h2>
            <span className="px-3 py-1 bg-green-100 rounded text-green-800">{ai.subject}</span>
          </div>
          {ai?.warning && (
  <div className="mb-4 p-2 bg-yellow-100 text-yellow-800 rounded font-semibold">
    {ai.warning}
  </div>
)}
        </>
      )}
    </div>
  )
}