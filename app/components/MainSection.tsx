'use client'
import { useState } from 'react'
import QuestionForm from './MainSection/QuestionForm'
import ResponseStyleButtons from './MainSection/ResponseStyleButtons'
import ExportPDFButton from './ExportPDFButton'
import TipsCard from './MainSection/TipsCard'

export default function MainSection() {
  const [question, setQuestion] = useState('')
  const [selectedStyle, setSelectedStyle] = useState(0)
  const [loading, setLoading] = useState(false)
  const [answer, setAnswer] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const styles = [
    'Step-by-step Explanation',
    'Math Equation Breakdown',
    'Essay/Passage Summarization',
    'Friendly Tutor Mode'
  ]

  async function handleGenerate() {
    setLoading(true)
    setError(null)
    setAnswer(null)

    try {
      const res = await fetch('/api/ai-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          style: styles[selectedStyle]
        })
      })

      const data = await res.json()
      setAnswer(data.answer || '')
      setError(data.error || null)
    } catch {
      setError('Failed to get AI answer.')
    }

    setLoading(false)
  }

  return (
    <section className="w-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row gap-10 items-center">
        {/* LEFT: Heading & Suggestions */}
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
            Got a Hard Question?
            <br />
            <span className="text-yellow-300">Let AI Solve It.</span>
          </h2>

          <p className="text-white/90 text-base sm:text-lg max-w-md mx-auto lg:mx-0">
            Paste your question, upload an image, or start typing below. Your AI tutor is ready 24/7.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-3">
            <button className="rounded-full bg-white text-blue-700 px-4 py-1 text-sm font-medium shadow-sm hover:bg-blue-50">
              Solve: 3x + 5 = 20
            </button>
            <button className="rounded-full bg-white text-blue-700 px-4 py-1 text-sm font-medium shadow-sm hover:bg-blue-50">
              Summarize: The Industrial Revolution
            </button>
            <button className="rounded-full bg-white text-blue-700 px-4 py-1 text-sm font-medium shadow-sm hover:bg-blue-50">
              Explain: Newton's First Law
            </button>
            <button className="rounded-full bg-white text-blue-700 px-4 py-1 text-sm font-medium shadow-sm hover:bg-blue-50">
              Upload physics formula
            </button>
          </div>
        </div>

        {/* RIGHT: Form */}
        <div className="w-full lg:w-[450px] rounded-2xl bg-white text-black p-6 shadow-lg flex flex-col gap-5">
          {/* Title */}
          <div>
            <h3 className="text-md font-semibold mb-2">Your Homework Question</h3>
            <QuestionForm question={question} setQuestion={setQuestion} />
          </div>

          {/* Response Style label */}
          <div>
            <h4 className="text-sm text-gray-600 font-semibold mb-2">Response Style</h4>
            <ResponseStyleButtons
              selected={selectedStyle}
              setSelected={setSelectedStyle}
              loading={loading}
              onGenerate={handleGenerate}
              disabled={!question}
            />
          </div>

          {/* Submit Button (Main Action) */}
          <button
            onClick={handleGenerate}
            disabled={loading || !question}
            className={`w-full text-white font-semibold py-2 rounded transition ${
              !question
                ? 'bg-gradient-to-r from-blue-300 to-purple-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90'
            }`}
          >
            {loading ? 'Generating Answer...' : 'Generate Answer'}
          </button>
        </div>
      </div>

      {/* ANSWER OUTPUT */}
      <div className="max-w-5xl mx-auto mt-10 px-4">
        {answer && (
          <div className="bg-white text-black border rounded p-4 mt-4 whitespace-pre-line shadow-sm">
            <b className="block mb-2">📘 AI Answer:</b>
            {answer}
            <ExportPDFButton content={answer} />
          </div>
        )}
        {error && <div className="text-red-200 mt-4">{error}</div>}
      </div>

      {/* Extra Tips Section (Optional) */}
      <TipsCard />
    </section>
  )
}