'use client'
import { useState } from 'react'
import SuggestionButtons from './MainSection/SuggestionButtons'
import QuestionForm from './MainSection/QuestionForm'
import ResponseStyleButtons from './MainSection/ResponseStyleButtons'
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
    <section className="space-y-8 sm:space-y-10">
      {/* Minimal Welcome */}
      <div className="flex flex-col items-center justify-center mb-2 sm:mb-6">
        <span className="text-2xl animate-bounce">👋</span>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2 mb-1 text-center">Welcome to Homework AI!</h2>
        <p className="text-gray-600 text-base text-center">
          Ask any question, upload an image, or just start typing below.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 max-w-5xl mx-auto">
        <div className="md:w-2/3 space-y-6">
          <QuestionForm question={question} setQuestion={setQuestion} />
          {answer && (
            <div className="bg-white border rounded-md p-4 mt-4 text-gray-800 whitespace-pre-line">
              <b>AI Answer:</b>
              <div>{answer}</div>
            </div>
          )}
          {error && (
            <div className="text-red-500 mt-2">{error}</div>
          )}
        </div>
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