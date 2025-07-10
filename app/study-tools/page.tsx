'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import FlashcardGenerator from '../components/FlashcardGenerator'
import EssayGrader from '../components/EssayGrader'
import PDFUploader from '../components/PDFUploader' // We'll create this component next

export default function StudyToolsPage() {
  const { user } = useUser()
  const isPro = user?.publicMetadata?.isPro === true

  const [extractedText, setExtractedText] = useState('')
  const [aiResult, setAiResult] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleAnalyze(text: string) {
    setLoading(true)
    setAiResult('')

    try {
      const res = await fetch('/api/ai-analyze-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      const data = await res.json()
      setAiResult(data.result)
    } catch {
      setAiResult('Failed to analyze text.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16 px-4">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
        AI-Powered Study Tools
      </h1>

      <div className="max-w-3xl mx-auto space-y-12">
        {/* Flashcard Generator */}
        <section>
          <h2 className="text-2xl font-bold mb-4">AI Flashcard Generator</h2>
          <FlashcardGenerator />
        </section>

        {/* Essay Grader */}
        <section>
          <h2 className="text-2xl font-bold mb-4">AI Essay Grader</h2>
          <EssayGrader />
        </section>

        {/* PDF Homework Analyzer */}
        <section>
          <h2 className="text-2xl font-bold mb-4">📄 PDF Homework Analyzer</h2>
          {!isPro ? (
            <div className="bg-white p-6 rounded shadow text-center">
              <p className="text-gray-600 mb-4">
                This feature is only available for <strong>Pro users</strong>.
              </p>
              <a
                href="/pricing"
                className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
              >
                Upgrade to Pro
              </a>
            </div>
          ) : (
            <div className="bg-white p-6 rounded shadow">
              <PDFUploader onExtractedText={handleAnalyze} />
              {loading && <p className="text-blue-500 mt-4">Analyzing PDF...</p>}
              {aiResult && (
                <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap mt-4 text-sm">
                  {aiResult}
                </pre>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}