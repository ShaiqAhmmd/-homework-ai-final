'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'

export default function PDFAnalyzerPage() {
  const { user } = useUser()
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)

  const isPro = user?.publicMetadata?.isPro === true

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async () => {
      try {
        setLoading(true)
        const base64 = reader.result
        const res = await fetch('/api/pdf-analyzer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pdf: base64 }),
        })

        const data = await res.json()
        setOutput(data.result || 'No summary returned.')
      } catch (err) {
        alert('Failed to process PDF')
      } finally {
        setLoading(false)
      }
    }

    reader.readAsDataURL(file)
  }

  if (!isPro) {
    return (
      <div className="max-w-xl mx-auto text-center py-20 px-6">
        <h1 className="text-3xl font-bold mb-4">🔒 PDF Analyzer is Pro-Only</h1>
        <p className="text-gray-600 mb-6">
          This tool is available for Pro members only. Upgrade to summarize and extract your homework PDFs.
        </p>
        <Link
          href="/pricing"
          className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-indigo-700 transition"
        >
          Upgrade to Pro
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">📄 AI PDF Homework Analyzer</h1>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleUpload}
        className="mb-4 block"
      />

      {loading && <p className="text-blue-500 mb-4">Analyzing your document...</p>}
      {output && (
        <div className="bg-white p-4 rounded-xl shadow whitespace-pre-wrap">
          {output}
        </div>
      )}
    </div>
  )
}