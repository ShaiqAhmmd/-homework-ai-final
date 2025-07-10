'use client'

import { useState } from 'react'
import ExportPDFButton from '../components/ExportPDFButton'
import QuestionForm from './MainSection/QuestionForm'
import ResponseStyleButtons from './MainSection/ResponseStyleButtons'
import TipsCard from './MainSection/TipsCard'
import SuggestionButtons from './MainSection/SuggestionButtons'

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
    'Friendly Tutor Mode',
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
          style: styles[selectedStyle],
        }),
      })

      const data = await res.json()
      if (data.answer) setAnswer(data.answer)
      else setError(data.error || 'No answer received.')
    } catch (err) {
      setError('Failed to get AI answer.')
    }

    setLoading(false)
  }

  return (
    <section className="space-y-10">
      {/* Top Title + Suggestions */}
      <div className="bg-white rounded-xl shadow-md text-center p-6 md:p-8 max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">👋 Welcome to Homework AI</h2>
        <p className="text-sm sm:text-base text-gray-600 mt-2">
          Paste your question, upload an image, or start typing below. Your AI tutor is ready.
        </p>
        <SuggestionButtons />
      </div>

      {/* Question Form + Answer */}
      <div className="flex flex-col md:flex-row gap-10 max-w-5xl mx-auto px-4">
        {/* Left: Question input and answer */}
        <div className="md:w-2/3 space-y-6">
          <QuestionForm question={question} setQuestion={setQuestion} />

          {answer && (
            <div className="bg-white border rounded-md p-4 mt-4 text-gray-800 whitespace-pre-line flex items-start justify-between">
              <div>
                <b>AI Answer:</b>
                <div>{answer}</div>
              </div>
              <ExportPDFButton content={answer} />
            </div>
          )}

          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>

        {/* Right: Style buttons + generate */}
        <div className="md:w-1/3 space-y-6">
          <ResponseStyleButtons
            selected={selectedStyle}
            setSelected={setSelectedStyle}
            loading={loading}
            onGenerate={handleGenerate}
            disabled={!question}
          />
        </div>
      </div>

      <TipsCard />
    </section>
  )
}