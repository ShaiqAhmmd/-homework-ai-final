import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

export async function POST(req: NextRequest) {
  const { userId } = await auth() || {}
  if (!userId) return NextResponse.json({ error: 'Not signed in' }, { status: 401 })

  const { essay } = await req.json()
  if (!essay) return NextResponse.json({ error: 'No essay provided' }, { status: 400 })

  const prompt = `
Please grade the following essay out of 10 and provide constructive feedback.

Respond ONLY in JSON format like this:

{
  "grade": "9/10",
  "feedback": "Your essay is well structured and covers the topic thoroughly..."
}

Essay:
${essay}
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

  let grade = ''
  let feedback = ''

  try {
    const parsed = JSON.parse(content)
    grade = parsed.grade || ''
    feedback = parsed.feedback || ''
  } catch {
    // fallback if parsing fails
    feedback = content
  }

  return NextResponse.json({ grade, feedback })
}