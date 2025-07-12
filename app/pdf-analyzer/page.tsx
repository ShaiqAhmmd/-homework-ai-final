'use client'
import { useState } from 'react'

export default function PDFAnalyzerPage() {
  const [file, setFile] = useState<File | null>(null)
  const [text, setText] = useState('')
  const [summary, setSummary] = useState('')
  const [questions, setQuestions] = useState<string[]>([])
  const [keywords, setKeywords] = useState<string[]>([])
  const [subject, setSubject] = useState('')
  const [search, setSearch] = useState('')
  const [aiAnswer, setAiAnswer] = useState('')
  const [page, setPage] = useState(1)
  const [numPages, setNumPages] = useState(1)

  // 1. Upload PDF and extract text
  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setFile(file)
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch('/api/pdf-analyzer/upload', { method: 'POST', body: formData })
    const data = await res.json()
    setText(data.text)
    setNumPages(data.numpages)
    // 2. Analyze text
    const res2 = await fetch('/api/pdf-analyzer/analyze', {
      method: 'POST',
      body: JSON.stringify({ text: data.text }),
      headers: { 'Content-Type': 'application/json' }
    })
    const ai = await res2.json()
    setSummary(ai.summary)
    setQuestions(ai.questions)
    setKeywords(ai.keywords)
    setSubject(ai.subject)
  }

  // 3. Smart search
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value)
  }

  // 4. AI Q&A
  async function handleAsk(question: string) {
    const res = await fetch('/api/pdf-analyzer/ask', {
      method: 'POST',
      body: JSON.stringify({ text, question }),
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await res.json()
    setAiAnswer(data.answer)
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">PDF Analyzer</h1>
      <input type="file" accept="application/pdf" onChange={handleUpload} className="mb-4" />

      {text && (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Summary</h2>
            <p className="bg-gray-50 p-3 rounded">{summary}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Detected Questions</h2>
            <ul className="list-disc ml-6">
              {questions.map((q, i) => <li key={i}>{q}</li>)}
            </ul>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Keywords</h2>
            <div className="flex flex-wrap gap-2">
              {keywords.map((k, i) => (
                <span key={i} className="px-2 py-1 bg-blue-100 rounded text-blue-800 text-sm">{k}</span>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Subject</h2>
            <span className="px-3 py-1 bg-green-100 rounded text-green-800">{subject}</span>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Smart Search</h2>
            <input
              type="text"
              placeholder="Search in PDF..."
              value={search}
              onChange={handleSearch}
              className="border px-2 py-1 rounded w-full"
            />
            {search && (
              <div className="mt-2 text-sm">
                <b>Results:</b> {text.toLowerCase().includes(search.toLowerCase()) ? 'Found!' : 'Not found.'}
              </div>
            )}
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">AI Q&A Assistant</h2>
            <form
              onSubmit={e => {
                e.preventDefault()
                // @ts-ignore
                handleAsk(e.target.elements.q.value)
              }}
              className="flex gap-2"
            >
              <input name="q" type="text" placeholder="Ask about this PDF..." className="border px-2 py-1 rounded w-full" />
              <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">Ask</button>
            </form>
            {aiAnswer && <div className="mt-2 bg-gray-50 p-3 rounded">{aiAnswer}</div>}
          </div>
        </>
      )}
    </div>
  )
}