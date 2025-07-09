'use client'
import { useEffect, useState } from 'react'

type HistoryItem = {
  _id: string
  question: string
  answer: string
  createdAt: string
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/history')
      .then(res => res.json())
      .then(data => {
        setHistory(data.history || [])
        setLoading(false)
      })
  }, [])

  function exportCSV() {
    const csv = [
      ['Question', 'Answer', 'Date'],
      ...history.map(h => [h.question, h.answer, new Date(h.createdAt).toLocaleString()])
    ].map(e => e.join(',')).join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'homework-ai-history.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Your AI History</h1>
      <button
        onClick={exportCSV}
        className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Export as CSV
      </button>
      {history.length === 0 && <div>No history yet.</div>}
      <ul className="space-y-4">
        {history.map(h => (
          <li key={h._id} className="bg-white rounded shadow p-4">
            <div className="text-gray-600 text-sm mb-1">{new Date(h.createdAt).toLocaleString()}</div>
            <div><b>Q:</b> {h.question}</div>
            <div className="mt-2"><b>A:</b> {h.answer}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}