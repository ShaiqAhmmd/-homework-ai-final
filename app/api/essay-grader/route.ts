import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

export async function POST(req: NextRequest) {
  const { userId } = await auth() || {}
  if (!userId) return NextResponse.json({ error: 'Not signed in' }, { status: 401 })

  const { essay } = await req.json()
  if (!essay) return NextResponse.json({ error: 'No essay provided' }, { status: 400 })

  const prompt = `
Grade this essay out of 10 and provide a short constructive comment:

${essay}

Format your response as:

Grade: X/10
Feedback: Your detailed feedback here.
`

  const res = await fetch('https://api.together.xyz/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
      messages: [
        { role: 'system', content: 'You are a helpful AI essay grader.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 600,
      temperature: 0.7,
    }),
  })

  const data = await res.json()
  const content = data?.choices?.[0]?.message?.content || ''

  return NextResponse.json({ feedback: content })
}