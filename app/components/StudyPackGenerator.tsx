'use client';

import { useState } from 'react';
import ExportCSVButton from './ExportCSVButton';
import ExportPDFButton from './ExportPDFButton';
import { useUserInfo } from '@/hooks/useUserInfo';

export default function StudyPackGenerator() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [flashcards, setFlashcards] = useState<{ q: string; a: string }[]>([]);
  const [quiz, setQuiz] = useState<
    { question: string; options: string[]; answer: string }[]
  >([]);
  const { isPro } = useUserInfo();

  async function generatePack() {
    if (!input.trim()) return;
    setLoading(true);
    setSummary('');
    setFlashcards([]);
    setQuiz([]);

    try {
      const res = await fetch('/api/pdf-analyzer/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });

      const data = await res.json();

      setSummary(data.summary || '');
      setQuiz(data.mcqs || []);
      setFlashcards(data.flashcards || []);
    } catch {
      alert('Failed to generate study pack');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold mb-4">🎓 Study Pack Generator</h2>

      <textarea
        rows={6}
        className="w-full border border-gray-300 rounded p-2"
        placeholder="Paste your textbook paragraph, topic, notes, or lectures..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={generatePack}
        disabled={loading}
        className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition disabled:opacity-50"
      >
        {loading ? 'Generating...' : '🎓 Generate Study Pack'}
      </button>

      {/* 📄 Summary */}
      {summary && (
        <>
          <h3 className="mt-10 mb-2 text-xl font-semibold">📝 Summary</h3>
          <div className="bg-white p-4 rounded shadow whitespace-pre-line mb-4">{summary}</div>
          <ExportPDFButton content={summary} filename="summary.pdf" />
        </>
      )}

      {/* 🧪 Quiz */}
      {quiz.length > 0 && (
        <>
          <h3 className="mt-10 mb-2 text-xl font-semibold">🧪 Quiz</h3>
          <div className="space-y-6">
            {quiz.slice(0, isPro ? quiz.length : 2).map((q, i) => (
              <div key={i} className="bg-white p-4 rounded shadow-sm">
                <p className="font-semibold">Q{i + 1}. {q.question}</p>
                <ul className="list-disc ml-6 mt-1">
                  {q.options.map((opt, idx) => (
                    <li key={idx} className={opt === q.answer ? 'text-green-600 font-bold' : ''}>
                      {opt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {!isPro && (
            <p className="text-yellow-900 bg-yellow-100 p-2 rounded mt-2 text-sm">
              🔒 Pro users can unlock full quizzes. 
              <a className="underline text-blue-600 ml-1" href="/pricing">Upgrade Now</a>
            </p>
          )}
        </>
      )}

      {/* 🧠 Flashcards */}
      {flashcards.length > 0 && (
        <>
          <h3 className="mt-10 mb-2 text-xl font-semibold">🧠 Flashcards</h3>

          {isPro ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {flashcards.map((f, i) => (
                  <div key={i} className="bg-white p-3 rounded shadow border">
                    <p><strong>Q:</strong> {f.q}</p>
                    <p className="text-green-700"><strong>A:</strong> {f.a}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <ExportCSVButton data={flashcards} filename="flashcards.csv" />
                <ExportPDFButton
                  content={flashcards.map(f => `Q: ${f.q}\nA: ${f.a}`).join('\n\n')}
                  filename="flashcards.pdf"
                />
              </div>
            </>
          ) : (
            <div className="bg-yellow-100 text-yellow-900 p-3 rounded my-4">
              🔒 Flashcard export is for Pro users only.  
              <a href="/pricing" className="underline text-blue-600 ml-1">Upgrade</a>
            </div>
          )}
        </>
      )}
    </section>
  );
}