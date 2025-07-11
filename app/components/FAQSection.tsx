'use client'
import { useState } from 'react'

const faqs = [
  {
    q: 'Is Homework AI cheating?',
    a: 'Nope! It’s a tutor that teaches you, not just gives you the answer.'
  },
  {
    q: 'What subjects are supported?',
    a: 'Math, science, English, chemistry, programming, and constantly growing.'
  },
  {
    q: 'Is my data secure?',
    a: 'Yes. It’s private by default — we never save your answers.'
  },
  {
    q: 'Can I cancel a Pro plan?',
    a: 'Yes. Cancel anytime with one click. No lock-in or fees.'
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">FAQs</h2>
        <p className="text-gray-600 mt-2">Most common questions, answered.</p>
      </div>

      <div className="space-y-4 max-w-4xl mx-auto">
        {faqs.map((item, i) => (
          <div
            key={i}
            className="bg-gray-50 border border-gray-200 rounded-md transition duration-150"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex justify-between items-center w-full text-left p-4 text-gray-800 font-medium"
            >
              {item.q}
              <span className="text-gray-500">{openIndex === i ? '-' : '+'}</span>
            </button>

            {openIndex === i && (
              <div className="px-4 pb-4 text-sm text-gray-600">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}