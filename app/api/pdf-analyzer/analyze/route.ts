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
  const questions = questionsRaw.split('\n').filter((q: { trim: () => { (): any; new(): any; length: number } }) => q.trim().length > 0)
  const keywords = keywordsRaw.split(/,|\n/).map((k: string) => k.trim()).filter(Boolean)

  // Optional: log for debugging
  console.log({ summary, questions, keywords, subject, warning })

  return NextResponse.json({
    summary,
    questions,
    keywords,
    subject,
    warning, // <-- include the warning in the response
  })
}