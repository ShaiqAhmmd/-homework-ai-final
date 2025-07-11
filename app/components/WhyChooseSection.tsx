'use client'

const reasons = [
  {
    icon: '✅',
    title: 'Solves the Toughest Questions',
    desc: 'From basic to advanced problems — get step-by-step help on anything.'
  },
  {
    icon: '👨‍🏫',
    title: 'Step-by-Step Like a Tutor',
    desc: 'Clear explanations that help you learn — not just copy answers.'
  },
  {
    icon: '📸',
    title: 'Text & Image Input',
    desc: 'Type your question or upload a photo. Both work instantly!'
  },
  {
    icon: '🔒',
    title: 'Private & Secure',
    desc: 'We never save your questions. You stay anonymous and safe.'
  },
  {
    icon: '📱',
    title: 'Mobile First',
    desc: 'Designed for smartphones, tablets, and small screens too.'
  },
  {
    icon: '🕐',
    title: 'Available 24/7',
    desc: 'Get instant help whenever you need it — no waiting involved.'
  }
]

export default function WhyChooseSection() {
  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">Why Choose Homework AI?</h2>
        <p className="text-gray-600 mt-2">
          You're not just getting answers — you're getting a tutor.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {reasons.map((reason, i) => (
          <div
            key={i}
            className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm p-6 text-left hover:shadow-md transition"
          >
            <div className="text-3xl mb-3">{reason.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{reason.title}</h3>
            <p className="text-sm text-gray-600">{reason.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}