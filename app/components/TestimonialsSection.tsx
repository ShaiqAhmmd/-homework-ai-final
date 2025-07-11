'use client'

const testimonials = [
  {
    name: 'Sarah Chen',
    grade: '11th Grade · Calculus',
    quote: 'Homework AI helped me solve a calculus problem I spent 3 hours on. So much clearer than my textbook!',
    note: 'Saved 3 hours',
    emoji: '🧠'
  },
  {
    name: 'Emily Rodriguez',
    grade: '10th Grade · English',
    quote: 'I love how it helps with writing structure. It actually teaches you while generating points.',
    note: 'Improved essay grades',
    emoji: '✍️'
  },
  {
    name: 'Marcus Johnson',
    grade: 'College Freshman · Chemistry',
    quote: 'I use it from my phone on the bus to solve reactions. Perfect mobile support.',
    note: 'Mobile friendly',
    emoji: '🔬'
  }
]

export default function TestimonialsSection() {
  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">What Students Say</h2>
        <p className="text-gray-600 mt-2">Real students. Real results. Real reviews.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-gray-50 border border-gray-200 p-6 rounded-xl text-left shadow hover:shadow-md transition"
          >
            <div className="text-3xl mb-2">{t.emoji}</div>
            <h3 className="text-md font-semibold text-gray-800">{t.name}</h3>
            <p className="text-xs text-gray-500 mb-2">{t.grade}</p>
            <p className="text-sm text-gray-700 italic mb-2">"{t.quote}"</p>
            <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 font-semibold rounded-full">
              {t.note}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}