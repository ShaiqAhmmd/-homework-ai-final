import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

export async function POST(req: NextRequest) {
  const { userId } = await auth() || {}
  if (!userId) return NextResponse.json({ error: 'Not signed in' }, { status: 401 })

  const { text } = await req.json()
  if (!text) return NextResponse.json({ error: 'No text provided' }, { status: 400 })

  const prompt = `
You are an AI teacher. Generate 5 unique multiple-choice questions from the following text.

Each question should have:
- A clear question text
- Four answer options labeled A, B, C, D
- The correct answer label (A/B/C/D)
- A short explanation

Return the result as a JSON array with keys: question, options, answer, explanation.

Text:
${text}

Format the response as a JSON array like this:
[
  {
    "question": "What is photosynthesis?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": "Option B"
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