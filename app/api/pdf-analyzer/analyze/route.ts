import { NextRequest, NextResponse } from 'next/server'
import { getAISummary, getAIQuestions, getAIFlashcards } from '../ai'

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
  const flashcardsRaw = await getAIFlashcards(limitedText)

  // Clean summary
  const summary = summaryRaw
    .replace(/^Summary:/i, '')
    .replace(/^\s*=/gm, '')
    .replace(/\n{2,}/g, '\n')
    .trim()

  // Clean questions
  const questions = questionsRaw
    .replace(/^Questions:/i, '')
    .split('\n')
    .map((q: string) => q.trim())
    .filter((q: string) =>
      q &&
      !q.toLowerCase().includes('please') &&
      !q.startsWith('```') &&
      !q.toLowerCase().includes('extract') &&
      !q.toLowerCase().includes('no questions found') &&
      q.length > 10
    )

  // Parse flashcards
  const flashcards: { q: string, a: string }[] = []
  flashcardsRaw.split(/Q:/i).forEach((block: { split: (arg0: RegExp) => [any, ...any[]] }) => {
    const [q, ...rest] = block.split(/A:/i)
    if (q && rest.length) {
      flashcards.push({
        q: q.trim().replace(/\n/g, ' '),
        a: rest.join('A:').trim().replace(/\n/g, ' ')
      })
    }
  })

  return NextResponse.json({
    summary,
    questions,
    flashcards,
    warning,
  })
}