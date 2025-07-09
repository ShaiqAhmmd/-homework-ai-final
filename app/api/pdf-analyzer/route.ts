import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import pdf from 'pdf-parse'

export async function POST(req: NextRequest) {
  const { userId } = await auth() || {}
  if (!userId) {
    return NextResponse.json({ error: 'Not signed in' }, { status: 401 })
  }

  const { pdf: base64pdf } = await req.json()
  if (!base64pdf) {
    return NextResponse.json({ error: 'No PDF provided' }, { status: 400 })
  }

  try {
    const base64 = base64pdf.split(',')[1]
    const buffer = Buffer.from(base64, 'base64')

    const parsed = await pdf(buffer)
    const text = parsed.text.slice(0, 3000) // Optional: limit to help AI

    const prompt = `Summarize and analyze this assignment PDF. Extract main objectives, tasks, and important concepts:\n\n${text}`

    const aiResponse = await fetch('https://api.together.xyz/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.TOGETHER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        messages: [
          { role: 'system', content: 'You are a helpful AI that summarizes academic content.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 600,
        temperature: 0.5,
      })
    })

    const data = await aiResponse.json()
    const result = data?.choices?.[0]?.message?.content

    return NextResponse.json({ result })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to process PDF' }, { status: 500 })
  }
}