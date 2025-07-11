'use client'

const subjects = [
  { icon: '🧮', name: 'Mathematics' },
  { icon: '🔬', name: 'Science' },
  { icon: '📖', name: 'English' },
  { icon: '🧪', name: 'Chemistry' },
  { icon: '⚡', name: 'Physics' },
  { icon: '💻', name: 'Programming' },
  { icon: '🌍', name: 'Geography' },
  { icon: '🏛️', name: 'History' },
]

export default function SubjectsSection() {
  return (
    <section className="w-full bg-gray-50 dark:bg-neutral-900 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Subjects We Cover</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          From basic math to advanced science — get help with all your subjects.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-10 max-w-6xl mx-auto">
        {subjects.map((subject, i) => (
          <div
            key={i}
            className="bg-white dark:bg-neutral-800 border dark:border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition"
          >
            <div className="text-4xl mb-2">{subject.icon}</div>
            <h3 className="font-semibold text-sm sm:text-base text-gray-800 dark:text-white">
              {subject.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  )
}