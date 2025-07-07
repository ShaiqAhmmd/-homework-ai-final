import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { connectToDatabase } from '@/lib/mongoose'
import History from '@/models/History'

export async function POST(req: NextRequest) {
  try {
    const authData = await auth();
const userId = authData?.userId;
    if (!userId) return NextResponse.json({ error: "Not signed in" }, { status: 401 })

    const { question, style } = await req.json()
    const togetherModel = "mistralai/Mixtral-8x7B-Instruct-v0.1"
    const prompt = `You are a helpful AI homework assistant. ${style ? `Respond in this style: ${style}.` : ''} Here is the question: ${question}`

    const response = await fetch('https://api.together.xyz/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.TOGETHER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: togetherModel,
        messages: [
          { role: 'system', content: 'You are a helpful AI homework assistant.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 512,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Together API error:', response.status, errorText)
      throw new Error('Together API error')
    }

    const data = await response.json()
    const answer = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate an answer."

    // Save to DB
    await connectToDatabase()
    await History.create({
      userId,
      question,
      answer,
    })

    return NextResponse.json({ answer })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to get AI answer.' }, { status: 500 })
  }
}