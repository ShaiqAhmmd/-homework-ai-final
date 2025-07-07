import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongoose'
import ContactMessage from '@/models/ContactMessage'

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json()
    await connectToDatabase()
    await ContactMessage.create({ name, email, subject, message })
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to save message.' }, { status: 500 })
  }
}