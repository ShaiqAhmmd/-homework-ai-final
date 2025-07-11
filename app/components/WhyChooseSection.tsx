'use client'

const reasons = [
  { icon: '✅', title: 'Tough Questions', desc: 'Handles hard and multi-step problems in any subject.' },
  { icon: '👩‍🏫', title: 'Step-by-Step Tutor', desc: 'Explains answers like a real human teacher.' },
  { icon: '📸', title: 'Snap or Type', desc: 'Upload a photo of your question or type it.' },
  { icon: '🔒', title: 'Private & Secure', desc: 'We don’t save your content. 100% private.' },
  { icon: '📱', title: 'Mobile-First', desc: 'Works on iPads, iPhones, Androids — optimized UX.' },
  { icon: '🌙', title: 'Available 24/7', desc: 'Day or night — Homework AI is always on.' },
]

export default function WhyChooseSection() {
  return (
    <section className="w-full bg-white dark:bg-neutral-900 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Why Choose Homework AI?</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          You're not just getting answers — you're getting a teacher built with AI.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {reasons.map((item, i) => (
          <div key={i} className="bg-gray-50 dark:bg-neutral-800 border dark:border-gray-700 p-6 rounded-lg text-left hover:shadow-md transition">
            <div className="text-3xl mb-3">{item.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}