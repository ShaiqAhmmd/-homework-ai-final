import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongoose'
import ContactMessage from '@/models/ContactMessage'

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase()
    const messages = await ContactMessage.find().sort({ createdAt: -1 }).lean()
    return NextResponse.json({ messages })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch messages.' }, { status: 500 })
  }
}