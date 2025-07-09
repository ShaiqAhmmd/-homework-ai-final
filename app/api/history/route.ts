import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { connectToDatabase } from '@/lib/mongoose'
import History from '@/models/History'

export async function GET(req: NextRequest) {
  const { userId } = await auth() || {}
  if (!userId) return NextResponse.json({ error: "Not signed in" }, { status: 401 })

  await connectToDatabase()
  const history = await History.find({ userId }).sort({ createdAt: -1 }).lean()
  return NextResponse.json({ history })
}