'use client'

const reasons = [
  {
    icon: '✅',
    title: 'Solves the Toughest Questions',
    desc: 'From basic to advanced problems — get step-by-step help on anything.'
  },
  {
    icon: '🧑‍🏫',
    title: 'Step-by-Step Like a Human Tutor',
    desc: 'Clear explanations that help you learn — not just copy the answer.'
  },
  {
    icon: '🔍',
    title: 'Handles Text & Image Input',
    desc: 'Snap a photo of your question or type it — both work!'
  },
  {
    icon: '🔒',
    title: 'Private & Secure',
    desc: 'We never store your questions. 100% privacy, always.'
  },
  {
    icon: '📱',
    title: 'Built for Mobile-First Use',
    desc: 'Works perfectly on phones, tablets, and anywhere else.'
  },
  {
    icon: '🕐',
    title: 'Available 24/7',
    desc: 'Get help instantly — no need to wait for tutors.'
  }
]

export default function WhyChooseSection() {
  return (
    <section className="w-full bg-white dark:bg-neutral-900 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Why Choose Homework AI?</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          You're not just getting answers — you're getting a real AI tutor.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {reasons.map((reason, i) => (
          <div
            key={i}
            className="bg-gray-50 dark:bg-neutral-800 border dark:border-gray-700 rounded-lg p-6 shadow-sm text-left hover:shadow-md transition"
          >
            <div className="text-3xl mb-3">{reason.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
              {reason.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{reason.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}