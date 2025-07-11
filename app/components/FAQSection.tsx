'use client'
import { useState } from 'react'

const faqs = [
  {
    q: 'Is Homework AI cheating?',
    a: 'No. It’s a study tool like a tutor — it helps you learn with step-by-step explanations.',
  },
  {
    q: 'How accurate are the explanations?',
    a: 'Very accurate, especially for math and science. But always double-check if it’s for grading!',
  },
  {
    q: 'What subjects are covered?',
    a: 'Math, science, English, history, programming, and more — we’re always adding more.',
  },
  {
    q: 'Is my data secure?',
    a: 'Yes. We do not save your questions — it’s private by design.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'You can cancel Pro any time. No hidden fees, no lock-in.',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="bg-white dark:bg-neutral-900 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((item, i) => (
            <div
              key={i}
              className="bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex justify-between items-center w-full text-left text-lg font-medium text-gray-800 dark:text-white"
              >
                {item.q}
                <span>{openIndex === i ? '−' : '+'}</span>
              </button>
              {openIndex === i && (
                <div className="mt-3 text-gray-600 dark:text-gray-300 text-sm">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}