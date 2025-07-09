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
    const text = parsed.text?.slice(0, 3000)

    const prompt = `Analyze this assignment:\n\n${text}`

    const aiRes = await fetch('https://api.together.xyz/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        messages: [
          { role: 'system', content: 'You help students understand homework.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 600,
        temperature: 0.5,
      }),
    })

    const data = await aiRes.json()
    const result = data?.choices?.[0]?.message?.content

    return NextResponse.json({ result })
  } catch (error) {
    console.error('Failed to parse PDF:', error)
    return NextResponse.json({ error: 'PDF parsing failed' }, { status: 500 })
  }
}