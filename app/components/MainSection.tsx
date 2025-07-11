'use client'

import { useState } from 'react'
import QuestionForm from './MainSection/QuestionForm'
import ExportPDFButton from '../components/ExportPDFButton'
import TipsCard from './MainSection/TipsCard'

export default function MainSection() {
  const [question, setQuestion] = useState('')
  const [subject, setSubject] = useState('')
  const [loading, setLoading] = useState(false)
  const [answer, setAnswer] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const exampleSuggestions = [
    'What is the integral of x²?',
    'Explain photosynthesis',
    'Help with essay structure'
  ]

  async function handleGenerate() {
    setLoading(true)
    setAnswer(null)
    setError(null)

    try {
      const res = await fetch('/api/ai-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, subject })
      })

      const data = await res.json()
      setAnswer(data.answer || '')
      setError(data.error || null)
    } catch {
      setError('Something went wrong.')
    }

    setLoading(false)
  }

  return (
    <section className="w-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white py-20 px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
        {/* LEFT: Hero Text */}
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Got a Hard Question?
            <br />
            <span className="text-yellow-300">Let AI Solve It.</span>
          </h1>
          <p className="text-white/90 text-base sm:text-lg max-w-md mx-auto lg:mx-0">
            Homework AI helps you solve your most difficult math, science, and writing questions 24/7 with explainable AI.
          </p>

          {/* Suggestions */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-2 pt-1">
            {exampleSuggestions.map((text, i) => (
              <button
                key={i}
                onClick={() => setQuestion(text)}
                className="bg-white text-gray-800 font-medium text-sm px-4 py-1 rounded-full hover:bg-blue-50 transition"
              >
                "{text}"
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: Form Card */}
        <div className="w-full lg:w-[460px] bg-white text-black p-6 rounded-2xl shadow-xl space-y-4">
          {/* Title */}
          <div className="flex flex-col items-center gap-1">
            <div className="text-4xl">🧠</div>
            <h2 className="text-xl font-semibold">Start Solving Now</h2>
            <p className="text-sm text-gray-500">Upload your question or type it below</p>
          </div>

          {/* Toggle Tabs - Optional if you use QuestionForm properly */}
          <div className="flex gap-2 justify-center mt-4">
            <button className="flex-1 text-sm px-3 py-2 bg-blue-50 text-blue-800 rounded-md font-medium border border-blue-200">
              📄 Type Question
            </button>
            <button className="flex-1 text-sm px-3 py-2 bg-gray-100 text-gray-500 border rounded-md">
              📷 Upload Image
            </button>
          </div>

          {/* Question Input */}
          <QuestionForm question={question} setQuestion={setQuestion} />

          {/* Subject Dropdown */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Subject (Optional)</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md text-sm"
            >
              <option>Choose subject for better results</option>
              <option>Mathematics</option>
              <option>Science</option>
              <option>English</option>
              <option>Chemistry</option>
              <option>Physics</option>
              <option>Programming</option>
              <option>History</option>
              <option>Geography</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleGenerate}
            disabled={loading || !question}
            className={`w-full text-white font-semibold py-2 rounded ${
              question
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90'
                : 'bg-gradient-to-r from-blue-300 to-purple-300 cursor-not-allowed'
            }`}
          >
            {loading ? 'Generating Answer...' : '💡  🧠  Get My Answer'}
          </button>

          {/* Info */}
          <div className="text-xs text-center text-gray-500 mt-2">
            <span className="text-green-600 font-medium">• Free to try</span> &nbsp;
            <span className="text-green-600 font-medium">• Instant results</span>
          </div>
        </div>
      </div>

      {/* AI Answer Output */}
      {answer && (
        <div className="max-w-4xl mx-auto mt-10 bg-white text-black p-5 rounded-lg shadow">
          <b className="block mb-2">📘 AI Answer:</b>
          <p className="whitespace-pre-line">{answer}</p>
          <ExportPDFButton content={answer} />
        </div>
      )}
      {error && <p className="text-red-200 mt-4">{error}</p>}

      <TipsCard />
    </section>
  )
}