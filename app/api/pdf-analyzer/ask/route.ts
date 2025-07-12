import { NextRequest, NextResponse } from 'next/server'
import { getAIAnswer } from '../ai'

export async function POST(req: NextRequest) {
  const { text, question } = await req.json()
  const answer = await getAIAnswer(text, question)
  return NextResponse.json({ answer })
}