'use client'

const subjects = [
  { icon: '🧮', name: 'Mathematics' },
  { icon: '🔬', name: 'Science' },
  { icon: '📖', name: 'English' },
  { icon: '🧪', name: 'Chemistry' },
  { icon: '⚡', name: 'Physics' },
  { icon: '💻', name: 'Programming' },
  { icon: '🌍', name: 'Geography' },
  { icon: '🏛️', name: 'History' }
]

export default function SubjectsSection() {
  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800">Subjects We Cover</h2>
        <p className="text-center text-gray-600 mt-2">
          From basic math to advanced science — get help with all your subjects.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-10 max-w-6xl mx-auto">
          {subjects.map((subject, i) => (
            <div
              key={i}
              className="bg-gray-50 border rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition"
            >
              <div className="text-4xl mb-2">{subject.icon}</div>
              <h3 className="font-semibold text-sm sm:text-base text-gray-800">
                {subject.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}