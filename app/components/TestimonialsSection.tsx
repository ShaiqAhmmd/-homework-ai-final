'use client'

const testimonials = [
  {
    name: 'Sarah Chen',
    grade: '11th Grade · Calculus',
    quote: 'Homework AI helped me solve a calculus problem I spent 3 hours on. The explanation was clearer than the textbook!',
    note: 'Saved 3 hours of frustration',
    emoji: '🎓',
  },
  {
    name: 'Marcus Johnson',
    grade: 'College Freshman · Chemistry',
    quote: 'Love the mobile chat-style interface. I get help during commutes with homework reactions.',
    note: 'Perfect mobile experience',
    emoji: '🧑‍🔬',
  },
  {
    name: 'Emily Rodriguez',
    grade: '10th Grade · English',
    quote: 'Essay structure help is amazing. It breaks down writing problems into actual solutions.',
    note: 'Improved grades fast',
    emoji: '👩‍🏫',
  },
  {
    name: 'Jake Thompson',
    grade: '12th Grade · Physics',
    quote: 'Electricity used to confuse me. This finally makes it all make sense.',
    note: 'Concepts simplified',
    emoji: '⚡',
  },
  {
    name: 'Priya Patel',
    grade: 'College Sophomore · Programming',
    quote: 'It finds errors, explains them, and fixes them. Better than Stack Overflow!',
    note: 'Best for debugging',
    emoji: '💻',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="w-full bg-gray-50 dark:bg-neutral-900 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">What Students Say</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Join thousands of students who've improved their grades with Homework AI
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm border dark:border-gray-700"
          >
            <div className="text-3xl mb-2">{t.emoji}</div>
            <h3 className="font-semibold text-gray-800 dark:text-white">{t.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{t.grade}</p>
            <blockquote className="text-sm text-gray-700 dark:text-gray-300 italic mb-3">
              "{t.quote}"
            </blockquote>
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
              {t.note}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}