import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

export async function POST(req: NextRequest) {
  const { userId } = await auth() || {}
  if (!userId) return NextResponse.json({ error: 'Not signed in' }, { status: 401 })

  const { text } = await req.json()
  if (!text) return NextResponse.json({ error: 'No text provided' }, { status: 400 })

  const prompt = `Summarize and analyze this homework text:\n\n${text.slice(0, 3000)}`

  const res = await fetch('https://api.together.xyz/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
      messages: [
        { role: 'system', content: 'You are a helpful AI homework assistant.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 600,
      temperature: 0.5,
    }),
  })

  const data = await res.json()
  const result = data?.choices?.[0]?.message?.content

  return NextResponse.json({ result })
}