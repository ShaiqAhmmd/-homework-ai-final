import { NextRequest, NextResponse } from 'next/server'
import { getAISummary, getAIQuestions, getAIKeywords, getAISubject } from '../ai'

export async function POST(req: NextRequest) {
  const { text } = await req.json()

  // Limit to first 8000 characters (or less)
  let warning = ''
  let limitedText = text
  if (text.length > 8000) {
    warning = 'PDF is too large. Only the first 8000 characters were analyzed.'
    limitedText = text.slice(0, 8000)
  }

  const summary = await getAISummary(limitedText)
  const questionsRaw = await getAIQuestions(limitedText)
  const keywordsRaw = await getAIKeywords(limitedText)
  const subject = await getAISubject(limitedText)

  // Parse questions and keywords into arrays
  const questions = questionsRaw.split('\n').filter((q: { trim: () => { (): any; new(): any; length: number }; toLowerCase: () => string | string[] }) => q.trim().length > 0 && !q.toLowerCase().includes('no questions found'))
  const keywords = keywordsRaw.split(/,|\n/).map((k: string) => k.trim()).filter(Boolean)

  return NextResponse.json({
    summary,
    questions,
    keywords,
    subject,
    warning,
  })
}