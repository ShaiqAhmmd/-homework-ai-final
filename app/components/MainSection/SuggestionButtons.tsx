'use client'
const suggests = [
  {
    icon: '🧮',
    label: 'Solve: 3x + 5 = 20',
    color: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200',
  },
  {
    icon: '📄',
    label: 'Summarize: The Industrial Revolution',
    color: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  },
  {
    icon: '⚙️',
    label: "Explain: Newton's First Law",
    color: 'bg-green-100 text-green-800 hover:bg-green-200',
  },
  {
    icon: '🖼️',
    label: 'Upload physics formula',
    color: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
  },
]

export default function SuggestionButtons() {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {suggests.map((s, index) => (
        <button
          key={index}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full shadow-sm transition ${s.color}`}
        >
          <span className="text-lg">{s.icon}</span>
          {s.label}
        </button>
      ))}
    </div>
  )
}