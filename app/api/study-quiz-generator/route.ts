import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

export async function POST(req: NextRequest) {
  const { userId } = await auth() || {}
  if (!userId) return NextResponse.json({ error: 'Not signed in' }, { status: 401 })

  const { text } = await req.json()
  if (!text) return NextResponse.json({ error: 'No text provided' }, { status: 400 })

  const prompt = `
Generate 5 multiple-choice quiz questions based on the following text. 
Each question should have 4 options, and indicate the correct answer.

Text:
${text}

Format the response as a JSON array like this:
[
  {
    "question": "Question text?",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "answer": "Correct option"
  },
  ...
]
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
        { role: 'system', content: 'You are a helpful AI quiz generator.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    }),
  })

  const data = await res.json()
  const content = data?.choices?.[0]?.message?.content || ''

  try {
    const quiz = JSON.parse(content)
    return NextResponse.json({ quiz })
  } catch {
    return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 })
  }
}