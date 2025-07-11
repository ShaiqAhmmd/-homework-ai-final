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
  <section className="py-12 px-4 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
    {/* Hero + Form Layout */}
    <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 max-w-7xl mx-auto">

      {/* LEFT: Hero Text */}
      <div className="w-full lg:w-1/2 text-center lg:text-left space-y-5">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
          Got a Hard Question? <br />
          <span className="text-yellow-300">Let AI Solve It.</span>
        </h2>
        <p className="text-white/90 text-base sm:text-lg max-w-md mx-auto lg:mx-0">
          Paste your question, upload an image, or start typing below. Your AI tutor is ready 24/7.
        </p>
        <SuggestionButtons />
      </div>

      {/* RIGHT: Form + Generator */}
      <div className="w-full lg:w-[450px] bg-white dark:bg-neutral-900 text-black dark:text-white rounded-xl p-6 shadow-md">
        {/* Question Form */}
        <QuestionForm question={question} setQuestion={setQuestion} />

        {/* Style Options + Generate Button */}
        <div className="mt-6">
          <ResponseStyleButtons
            selected={selectedStyle}
            setSelected={setSelectedStyle}
            loading={loading}
            onGenerate={handleGenerate}
            disabled={!question}
          />
        </div>
      </div>

    </div>

    {/* AI Answer Output */}
    <div className="max-w-5xl mx-auto mt-10 px-4">
      {answer && (
        <div className="bg-white dark:bg-neutral-900 border rounded p-4 mt-4 text-black dark:text-white whitespace-pre-line shadow-sm">
          <b>📘 AI Answer:</b>
          <div className="mt-2">{answer}</div>
          <ExportPDFButton content={answer} />
        </div>
      )}
      {error && (
        <div className="text-red-500 mt-4">{error}</div>
      )}
    </div>

    <TipsCard />
  </section>
);
}