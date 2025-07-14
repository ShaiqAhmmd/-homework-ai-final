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

  const summaryRaw = await getAISummary(limitedText)
  const questionsRaw = await getAIQuestions(limitedText)
  const keywordsRaw = await getAIKeywords(limitedText)
  const subjectRaw = await getAISubject(limitedText)

  // Post-process AI output for clean results
  const summary = summaryRaw
    .replace(/^Summary:/i, '')
    .replace(/^\s*=/gm, '')
    .replace(/\n{2,}/g, '\n')
    .trim()

  const questions = questionsRaw
    .replace(/^Questions:/i, '')
    .split('\n')
    .map((q: string) => q.trim())
    .filter((q: string) =>
      q &&
      !q.toLowerCase().includes('please') &&
      !q.startsWith('```') &&
      !q.toLowerCase().includes('extract') &&
      !q.toLowerCase().includes('no questions found')
    )

  const keywords = keywordsRaw
    .replace(/^Keywords:/i, '')
    .split(/,|\n/)
    .map((k: string) => k.trim())
    .filter(Boolean)
    .filter((k: string | any[]) => k.length < 40) // filter out long sentences

  const subject = subjectRaw
    .replace(/^Subject:/i, '')
    .replace(/[^a-zA-Z ]/g, '')
    .trim()
    .split(' ')[0] // just the first word

  return NextResponse.json({
    summary,
    questions,
    keywords,
    subject,
    warning,
  })
}