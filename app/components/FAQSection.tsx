'use client'
import { useState } from 'react'

const faqs = [
  {
    q: 'Is Homework AI cheating?',
    a: 'Nope. Think of it like a tutor — it teaches you how to solve, not just gives the answer.'
  },
  {
    q: 'How accurate are the explanations?',
    a: 'Almost always accurate, especially for STEM. Still double-check for class rules!'
  },
  {
    q: 'What subjects are covered?',
    a: 'Math, science, English, history, programming, geography — and more in progress!'
  },
  {
    q: 'Is my data secure?',
    a: 'Yes, questions aren’t stored or shared. We built it private by default.'
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Cancel your Pro plan at any time with 1 click — no tricks, no stress.'
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="w-full bg-white dark:bg-neutral-900 py-16 px-4">
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
                className="w-full flex justify-between items-center text-left text-lg font-medium text-gray-800 dark:text-white"
              >
                {item.q}
                <span>{openIndex === i ? '-' : '+'}</span>
              </button>

              {openIndex === i && (
                <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
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