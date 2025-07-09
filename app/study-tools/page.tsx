'use client'

import { useState } from 'react'
import FlashcardGenerator from '../components/FlashcardGenerator'
import EssayGrader from '../components/EssayGrader'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'

export default function StudyToolsPage() {
  const { user } = useUser()
  const isPro = user?.publicMetadata?.isPro === true

  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16 px-4">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
        AI-Powered Study Tools
      </h1>

      <div className="max-w-3xl mx-auto space-y-12">
        {/* 🧠 Flashcard Generator */}
        <div>
          <FlashcardGenerator />
        </div>

        {/* ✍️ Essay Grader */}
        <div>
          <EssayGrader />
        </div>

        {/* 📄 Pro-only PDF Homework Analyzer */}
        <div>
          <h2 className="text-2xl font-bold mb-4 mt-14">📄 PDF Homework Analyzer</h2>
          {!isPro ? (
            <div className="bg-white p-6 rounded shadow text-center">
              <p className="text-gray-600 mb-4">
                This feature is only available for <strong>Pro users</strong>.
              </p>
              <Link
                href="/pricing"
                className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
              >
                Upgrade to Pro
              </Link>
            </div>
          ) : (
            <div className="bg-white p-6 rounded shadow">
              <input
                type="file"
                accept="application/pdf"
                onChange={handleUpload}
                className="mb-4 block w-full"
              />

              {loading && <p className="text-blue-500 mb-4">Analyzing PDF...</p>}
              {output && (
                <div className="bg-gray-100 p-4 rounded whitespace-pre-wrap text-sm">
                  {output}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}