export default function ResponseStyleButtons({
  selected,
  setSelected,
  loading,
  onGenerate,
  disabled,
}: {
  selected: number
  setSelected: (idx: number) => void
  loading: boolean
  onGenerate: () => void
  disabled: boolean
}) {
  const styles = [
    {
      label: 'Step-by-step Explanation',
      icon: '📋',
      color: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200',
    },
    {
      label: 'Math Equation Breakdown',
      icon: '🧮',
      color: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    },
    {
      label: 'Essay/Passage Summarization',
      icon: '📝',
      color: 'bg-green-100 text-green-800 hover:bg-green-200',
    },
    {
      label: 'Friendly Tutor Mode',
      icon: '🎓',
      color: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
    },
  ]

  return (
    <div className="space-y-3">
      <div className="font-semibold text-gray-900 mb-2">Response Style</div>
      {styles.map((s, idx) => (
        <button
          key={s.label}
          className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg font-medium shadow-sm transition border
            ${s.color}
            ${selected === idx ? 'ring-2 ring-indigo-400 border-indigo-300' : 'border-transparent'}
          `}
          onClick={() => setSelected(idx)}
        >
          <span className="text-lg">{s.icon}</span>
          {s.label}
        </button>
      ))}
      <button
        className="w-full mt-4 bg-gradient-to-r from-blue-400 to-purple-400 text-white font-semibold py-2 rounded-lg shadow hover:opacity-90 transition"
        onClick={onGenerate}
        disabled={loading || disabled}
      >
        {loading ? 'Generating...' : 'Generate Answer'}
      </button>
    </div>
  )
}