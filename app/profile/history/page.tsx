'use client'
import ExportPDFButton from '../../components/ExportPDFButton'
import ExportCSVButton from '../../components/ExportCSVButton'
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
      ...history.map(h => [h.question, h.answer, new Date(h.createdAt).toLocaleString()]),
    ]
      .map(e => e.join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'homework-ai-history.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const pdfContent = history
    .map(
      (h, i) =>
        `${i + 1}. Date: ${new Date(h.createdAt).toLocaleString()}\nQ: ${h.question}\nA: ${h.answer}\n`
    )
    .join('\n')

  if (loading) return <div>Loading...</div>

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Your AI History</h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={exportCSV}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Export as CSV
        </button>

        <ExportPDFButton content={pdfContent} filename="homework-ai-history.pdf" />
      </div>

      {history.length === 0 ? (
        <p>No history yet. Start asking questions!</p>
      ) : (
        <ul className="space-y-4">
          {history.map(h => (
            <li key={h._id} className="bg-white p-4 rounded shadow border">
              <p className="text-xs text-gray-500 mb-1">{new Date(h.createdAt).toLocaleString()}</p>
              <p><strong>Q:</strong> {h.question}</p>
              <p className="whitespace-pre-line mt-2"><strong>A:</strong> {h.answer}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}