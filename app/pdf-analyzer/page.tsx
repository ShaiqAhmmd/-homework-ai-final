'use client'
import { useState } from 'react'

export default function PDFAnalyzerPage() {
  const [file, setFile] = useState<File | null>(null)
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [ai, setAI] = useState<any>(null)

  // 1. Extract text from PDF in browser
  async function extractTextFromPDF(file: File) {
    setLoading(true)
    const pdfjsLib = await import('pdfjs-dist/build/pdf')
    // ✅ Use CDN for workerSrc (this always works on Vercel/Next.js)
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
    let fullText = ''
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const content = await page.getTextContent()
      fullText += content.items.map((item: any) => item.str).join(' ') + '\n'
    }
    setText(fullText)
    setLoading(false)
    return fullText
  }

  // 2. Handle file upload
  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setFile(file)
    const extracted = await extractTextFromPDF(file)
    // 3. Send to backend for AI analysis
    const res = await fetch('/api/pdf-analyzer/analyze', {
      method: 'POST',
      body: JSON.stringify({ text: extracted }),
      headers: { 'Content-Type': 'application/json' }
    })
    setAI(await res.json())
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
        </>
      )}
    </div>
  )
}