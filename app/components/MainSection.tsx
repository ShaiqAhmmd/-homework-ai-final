'use client'

import { useState } from 'react'
import QuestionForm from './MainSection/QuestionForm'
import ExportPDFButton from '../components/ExportPDFButton'
import TipsCard from './MainSection/TipsCard'

export default function MainSection() {
  const [question, setQuestion] = useState('')
  const [selectedStyle, setSelectedStyle] = useState<number | null>(null)
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
    if (!question || selectedStyle === null) {
      setError('Please enter a question and select a response style.')
      return
    }

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
        }),
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
    // ✅ OUTER FULL WIDTH GRADIENT CONTAINER THAT STRETCHES TO SCREEN EDGE
    <div className="w-full bg-gradient-to-br from-blue-600 to-indigo-600">
      <section className="max-w-7xl mx-auto px-4 text-white pt-20 pb-32">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* LEFT SIDE */}
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
              Got a Hard Question?
              <br />
              <span className="text-yellow-300">Let AI Solve It.</span>
            </h1>

            <p className="text-white/90 text-base sm:text-lg max-w-md mx-auto lg:mx-0">
              Homework AI helps you solve your most difficult math, science, and writing questions 24/7 with explainable AI.
            </p>

            {/* Suggestion Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {[
                'What is the integral of x²?',
                'Explain photosynthesis',
                'Help with essay structure'
              ].map((text, i) => (
                <button
                  key={i}
                  onClick={() => setQuestion(text)}
                  className="bg-white text-gray-800 font-medium text-sm px-4 py-1 rounded-full hover:bg-blue-50 shadow-sm"
                >
                  "{text}"
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE - WHITE BOX */}
          <div className="w-full lg:w-[460px] bg-white text-black p-6 rounded-2xl shadow-xl space-y-4">
            <div className="text-center">
              <div className="text-3xl">🧠</div>
              <h2 className="text-xl font-semibold mt-1">Start Solving Now</h2>
              <p className="text-sm text-gray-600">Upload your question or type it below</p>
            </div>

            {/* 📝 Question + Image Upload Form */}
            <QuestionForm question={question} setQuestion={setQuestion} />

            {/* 🔘 Subject buttons */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Subject (Optional)
              </label>
              <div className="grid grid-cols-2 gap-3">
                {styles.map((label, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedStyle(i)}
                    className={`flex items-center justify-center px-3 py-2 text-sm rounded-md border text-center transition ${
                      selectedStyle === i
                        ? 'bg-blue-100 border-blue-500 text-blue-800 font-semibold shadow-sm'
                        : 'bg-gray-100 border-gray-300 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleGenerate}
              disabled={loading || !question || selectedStyle === null}
              className={`w-full text-white font-semibold py-2 rounded transition ${
                question && selectedStyle !== null
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90'
                  : 'bg-gradient-to-r from-blue-300 to-purple-300 cursor-not-allowed'
              }`}
            >
              {loading ? 'Generating Answer...' : '🧠 Get My Answer'}
            </button>

            <div className="text-xs text-center text-gray-500 mt-1">
              ✅ Free to try &nbsp; • &nbsp; ⚡ Instant results
            </div>
          </div>
        </div>

        {/* AI Answer */}
        {answer && (
          <div className="max-w-4xl mx-auto mt-10 bg-white text-black p-5 rounded-lg shadow">
            <b className="block mb-2">📘 AI Answer:</b>
            <p className="whitespace-pre-line">{answer}</p>
            <ExportPDFButton content={answer} />
          </div>
        )}

        {error && <p className="text-red-200 mt-4 text-center">{error}</p>}

        <TipsCard />
      </section>
    </div>
  )
}