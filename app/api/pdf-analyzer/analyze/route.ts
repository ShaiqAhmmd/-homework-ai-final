import { NextRequest, NextResponse } from 'next/server';
import { getAISummary, getAIQuestions, getAIFlashcards, getAIMCQs } from '../ai';

type MCQ = {
  q: string;
  options: string[];
  answer: string;
  explanation: string;
};

export async function POST(req: NextRequest) {
  const { text } = await req.json();

  // Limit to first 8000 characters (or less)
  let warning = '';
  let limitedText = text;
  if (text.length > 8000) {
    warning = 'PDF is too large. Only the first 8000 characters were analyzed.';
    limitedText = text.slice(0, 8000);
  }

  // Generate AI content
  const summaryRaw = await getAISummary(limitedText);
  const questionsRaw = await getAIQuestions(limitedText);
  const flashcardsRaw = await getAIFlashcards(limitedText);
  const mcqRaw = await getAIMCQs(limitedText); // returns parsed JSON array

  // Clean summary
  const summary = summaryRaw
    .replace(/^Summary:/i, '')
    .replace(/^\s*-/gm, '')
    .replace(/\n{2,}/g, '\n')
    .trim();

  // Clean questions
  const questions = questionsRaw
    .replace(/^Questions:/i, '')
    .split('\n')
    .map((q: string) => q.trim())
    .filter(
      (q: string) =>
        q &&
        !q.toLowerCase().includes('please') &&
        !q.startsWith('```') &&
        !q.toLowerCase().includes('extract') &&
        !q.toLowerCase().includes('no questions found') &&
        q.length > 10
    );

  // Parse flashcards
  const flashcards: { q: string; a: string }[] = [];
  flashcardsRaw.split(/Q:/i).forEach((block: { split: (arg0: RegExp) => [any, ...any[]]; }) => {
    const [q, ...rest] = block.split(/A:/i);
    if (q && rest.length) {
      flashcards.push({
        q: q.trim().replace(/\n/g, ' '),
        a: rest.join('A:').trim().replace(/\n/g, ' '),
      });
    }
  });

  // Parse MCQs properly (mcqRaw is already parsed JSON array)
  const mcqs: MCQ[] = [];
  if (Array.isArray(mcqRaw)) {
    mcqRaw.forEach((item) => {
      mcqs.push({
        q: item.question,
        options: item.options,
        answer: item.answer,
        explanation: item.explanation,
      });
    });
  }
console.log('Raw MCQ AI response:', mcqRaw);
  return NextResponse.json({
    summary,
    questions,
    flashcards,
    mcqs,
    warning,
  });
}