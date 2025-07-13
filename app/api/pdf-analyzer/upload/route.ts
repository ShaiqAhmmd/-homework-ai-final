import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File

  if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })

  // DO NOT use fs.readFileSync or open here!
  // Only process the uploaded file from the user

  // You can send the file to the client for parsing, or just return success
  return NextResponse.json({ ok: true })
}