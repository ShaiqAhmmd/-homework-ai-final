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
    // OUTER FULL WIDTH, FULL HEIGHT GRADIENT
    <section className="w-full min-h-[90vh] bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center py-16">
      <div className="container max-w-7xl mx-auto px-4 lg:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT COLUMN */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Got a Hard Question?
              <br />
              <span className="block text-yellow-300">Let AI Solve It.</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Homework AI helps you solve your most difficult math, science, and writing questions 24/7 with explainable AI.
            </p>
            <div className="flex flex-wrap gap-2 mb-8 justify-center lg:justify-start">
              <span className="px-3 py-2 bg-white/20 rounded-full text-sm text-white backdrop-blur-sm">
                "What is the integral of x²?"
              </span>
              <span className="px-3 py-2 bg-white/20 rounded-full text-sm text-white backdrop-blur-sm">
                "Explain photosynthesis"
              </span>
              <span className="px-3 py-2 bg-white/20 rounded-full text-sm text-white backdrop-blur-sm">
                "Help with essay structure"
              </span>
            </div>
          </div>
          {/* RIGHT COLUMN */}
          <div>
            <div className="p-6 md:p-8 bg-white rounded-2xl shadow-2xl max-w-xl mx-auto">
              {/* --- KEEP YOUR EXISTING FORM COMPONENTS HERE --- */}
              <div className="text-center">
                <div className="text-3xl">🧠</div>
                <h2 className="text-xl font-semibold mt-1">Start Solving Now</h2>
                <p className="text-sm text-gray-600">Upload your question or type it below</p>
              </div>
              <QuestionForm question={question} setQuestion={setQuestion} />
              <div className="space-y-2 mt-6">
                <label className="block text-sm font-semibold text-gray-700">
                  Subject (Optional)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {styles.map((label, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedStyle(i)}
                      className={`px-3 py-2 text-sm rounded-md border transition ${
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
              <button
                onClick={handleGenerate}
                disabled={loading || !question || selectedStyle === null}
                className={`w-full text-white font-semibold py-2 rounded transition mt-6 ${
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
      </div>
    </section>
  )
}