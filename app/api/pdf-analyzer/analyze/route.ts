import { NextRequest, NextResponse } from 'next/server'
import { getAISummary, getAIQuestions, getAIKeywords, getAISubject } from '../ai'

export async function POST(req: NextRequest) {
  const { text } = await req.json()
  const summary = await getAISummary(text)
  const questionsRaw = await getAIQuestions(text)
  const keywordsRaw = await getAIKeywords(text)
  const subject = await getAISubject(text)

  // Parse questions and keywords into arrays
  const questions = questionsRaw.split('\n').filter((q: { trim: () => { (): any; new(): any; length: number } }) => q.trim().length > 0)
  const keywords = keywordsRaw.split(/,|\n/).map((k: string) => k.trim()).filter(Boolean)
console.log({ summary, questions, keywords, subject })
  return NextResponse.json({
    summary,
    questions,
    keywords,
    subject,
  })
}