'use client'

import React from 'react'
import { jsPDF } from 'jspdf'

type Props = {
  content: string
  filename?: string
}

export default function ExportPDFButton({ content, filename = 'export.pdf' }: Props) {
  const handleExport = () => {
    const doc = new jsPDF()
    const pageHeight = doc.internal.pageSize.height
    const margin = 10
    const maxLineWidth = doc.internal.pageSize.width - margin * 2
    const lineHeight = 10

    const lines = doc.splitTextToSize(content, maxLineWidth)
    let y = margin

    for (let i = 0; i < lines.length; i++) {
      if (y + lineHeight > pageHeight - margin) {
        doc.addPage()
        y = margin
      }
      doc.text(lines[i], margin, y)
      y += lineHeight
    }

    doc.save(filename)
  }

  return (
    <button
      onClick={handleExport}
      className="ml-4 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
      title="Export as PDF"
    >
      Export PDF
    </button>
  )
}