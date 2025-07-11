'use client'
import { useState } from 'react'
import QuestionForm from './MainSection/QuestionForm'
import ResponseStyleButtons from './MainSection/ResponseStyleButtons'
import SuggestionButtons from './MainSection/SuggestionButtons'
import ExportPDFButton from '../components/ExportPDFButton'
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
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question,
          style: styles[selectedStyle]
        })
      })

      const data = await res.json()
      setAnswer(data.answer || '')
      setError(data.error || null)
    } catch (err) {
      setError('Failed to get AI answer.')
    }

    setLoading(false)
  }

  return (
    <section className="w-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row gap-10 items-center">
        {/* LEFT SIDE */}
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Got a Hard Question?
            <br />
            <span className="text-yellow-300">Let AI Solve It.</span>
          </h1>
          <p className="text-white/90 text-base sm:text-lg max-w-md mx-auto lg:mx-0">
            Paste your question, upload an image, or start typing below. Your AI tutor is ready 24/7.
          </p>

          {/* Suggestion Buttons (CUSTOM!) */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3">
            {[
              'Solve: 3x + 5 = 20',
              'Summarize: The Industrial Revolution',
              "Explain: Newton's First Law",
              'Upload physics formula'
            ].map((text, i) => (
              <button
                key={i}
                className="px-4 py-1 text-sm rounded-full bg-white text-blue-800 hover:bg-blue-100 transition"
              >
                {text}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="w-full lg:w-[450px] bg-white text-black rounded-xl p-6 shadow-md">
          {/* Your Homework Question Form */}
          <QuestionForm question={question} setQuestion={setQuestion} />

          {/* Label */}
          <h4 className="text-sm text-gray-600 mt-6 mb-2 font-semibold">
            Response Style
          </h4>

          {/* Custom Style Option Buttons */}
          <ResponseStyleButtons
            selected={selectedStyle}
            setSelected={setSelectedStyle}
            loading={loading}
            onGenerate={handleGenerate}
            disabled={!question}
          />

          {/* Submit Button */}
          <button
            onClick={handleGenerate}
            disabled={loading || !question}
            className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded font-semibold text-sm shadow hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Generating Answer...' : 'Generate Answer'}
          </button>
        </div>
      </div>

      {/* AI OUTPUT */}
      <div className="max-w-5xl mx-auto mt-12 px-4">
        {answer && (
          <div className="bg-white border text-black p-4 rounded shadow whitespace-pre-line mt-4">
            <b className="block mb-2">📘 AI Answer:</b>
            <div>{answer}</div>
            <ExportPDFButton content={answer} />
          </div>
        )}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>

      <TipsCard />
    </section>
  )
}