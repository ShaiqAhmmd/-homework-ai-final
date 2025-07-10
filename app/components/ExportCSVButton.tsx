'use client'

import React from 'react'
import { Parser } from 'json2csv'

type Props = {
  data: object[]
  filename?: string
}

export default function ExportCSVButton({ data, filename = 'export.csv' }: Props) {
  const handleExport = () => {
    try {
      const parser = new Parser()
      const csv = parser.parse(data)
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      alert('Failed to export CSV')
    }
  }

  return (
    <button
      onClick={handleExport}
      className="ml-4 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
      title="Export as CSV"
    >
      Export CSV
    </button>
  )
}