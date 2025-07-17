import { NextRequest, NextResponse } from 'next/server';
import { getAISummary, getAIQuestions, getAIFlashcards, getAIMCQs } from '../ai';

export async function POST(req: NextRequest) {
  const { text } = await req.json();

  // Limit to first 8000 characters (or less)
  let warning = '';
  let limitedText = text;
  if (text.length > 8000) {
    warning = 'PDF is too large. Only the first 8000 characters were analyzed.';
    limitedText = text.slice(0, 8000);
  }

  const summaryRaw = await getAISummary(limitedText);
  const questionsRaw = await getAIQuestions(limitedText);
  const flashcardsRaw = await getAIFlashcards(limitedText);
  const mcqRaw = await getAIMCQs(limitedText); // ✅ NEW

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

  // ✅ Parse MCQs
  type MCQ = {
    q: string;
    options: string[];
    answer: string;
    explanation: string;
  };

  const mcqs: MCQ[] = [];

  mcqRaw.split(/Q:\s*/).forEach((block: string) => {
  const lines = block.trim().split('\n').map((line: string) => line.trim()).filter(Boolean);
  if (lines.length < 5) return; // skip incomplete blocks

  const question = lines[0].replace(/^\d+\.\s*/, '').trim();

  const options = lines.slice(1, 5).map((opt: string) => opt.replace(/^[A-D][\.\)]\s*/, ''));

  const answerLine = lines.find((line: string) => /^Answer[:\s]/i.test(line)) || '';
  const explanationLine = lines.find((line: string) => /^Explanation[:\s]/i.test(line)) || '';

  const answer = answerLine.replace(/^Answer[:\s]*/i, '').trim();

  const explanation = explanationLine.replace(/^Explanation[:\s]*/i, '').trim();

  if (question && options.length === 4) {
    mcqs.push({ q: question, options, answer, explanation });
  }
});

  return NextResponse.json({
    summary,
    questions,
    flashcards,
    mcqs,      // ✅ returned to frontend
    warning,
  });
}