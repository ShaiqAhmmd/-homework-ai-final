import { NextRequest, NextResponse } from 'next/server'
import pdfParse from 'pdf-parse'

export const runtime = 'nodejs' // required for pdf-parse

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File

  if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })

  const buffer = Buffer.from(await file.arrayBuffer())
  const data = await pdfParse(buffer)

  // data.text = all text, data.numpages, etc.
  return NextResponse.json({
    text: data.text,
    numpages: data.numpages,
    info: data.info,
  })
}