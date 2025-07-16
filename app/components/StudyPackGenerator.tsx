'use client';

import { useState } from 'react';
import ExportCSVButton from './ExportCSVButton';
import ExportPDFButton from './ExportPDFButton';
import { useUserInfo } from '@/hooks/useUserInfo';

export default function StudyPackGenerator() {
  const [input, setInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState('');
  const [flashcards, setFlashcards] = useState<{ q: string; a: string }[]>([]);
  const [quiz, setQuiz] = useState<{ question: string; options: string[]; answer: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { isPro } = useUserInfo();

  async function handleUpload(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/pdf-analyzer/upload', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    if (data.text) {
      setInput(data.text);
    } else {
      alert('Failed to extract text from uploaded file.');
    }
  }

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      handleUpload(selected);
    }
  };

  async function generatePack() {
    if (!input.trim()) return;

    setLoading(true);
    setError('');
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
      setFlashcards(data.flashcards || []);
      setQuiz(data.mcqs || []);
    } catch {
      setError('🔴 Failed to generate study pack. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <textarea
        className="w-full border border-gray-300 rounded p-3 mb-4"
        rows={5}
        placeholder="Paste your textbook paragraph, notes, or lecture..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="flex flex-wrap gap-4 mb-6">
        <label className="bg-gray-100 px-4 py-2 rounded border cursor-pointer hover:bg-gray-200 transition">
          📂 Upload PDF or Image
          <input type="file" accept=".pdf,image/*" hidden onChange={handleSelectFile} />
        </label>

        <button
          onClick={generatePack}
          disabled={loading}
          className="bg-purple-600 text-white font-bold px-5 py-2 rounded hover:bg-purple-700 transition disabled:opacity-50"
        >
          {loading ? 'Generating...' : '🎓 Generate Study Pack'}
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {/* 📝 Summary */}
      {summary && (
        <section className="mb-6">
          <h3 className="text-xl font-bold mb-2">📝 Summary</h3>
          <div className="p-4 bg-white border rounded whitespace-pre-wrap">{summary}</div>
          <div className="mt-3">
  <ExportPDFButton content={summary} filename="summary.pdf" />
</div>
        </section>
      )}

      {/* 🧠 Flashcards */}
      {flashcards.length > 0 && (
        <section className="mb-6">
          <h3 className="text-xl font-bold mb-2">🧠 Flashcards</h3>

          {isPro ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {flashcards.map((card, i) => (
                  <div key={i} className="bg-blue-50 p-3 rounded shadow border">
                    <p><strong>Q:</strong> {card.q}</p>
                    <p className="text-green-700 mt-1"><strong>A:</strong> {card.a}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-3">
                <ExportCSVButton data={flashcards} filename="flashcards.csv" />
                <ExportPDFButton content={flashcards.map(fc => `Q: ${fc.q}\nA: ${fc.a}`).join('\n\n')} filename="flashcards.pdf" />
              </div>
            </>
          ) : (
            <div className="bg-yellow-100 text-yellow-900 p-3 my-4 rounded">
              🔒 Pro Required: Exporting flashcards requires Pro.  
              <a href="/pricing" className="ml-2 text-blue-600 underline">Upgrade</a>
            </div>
          )}
        </section>
      )}

      {/* 🧪 Quiz */}
      {quiz.length > 0 && (
        <section>
          <h3 className="text-xl font-bold mb-2">🧪 Quiz</h3>
          <div className="space-y-6">
            {quiz.slice(0, isPro ? quiz.length : 2).map((q, i) => (
              <div key={i} className="bg-white p-4 border rounded shadow-sm">
                <p className="font-semibold mb-2">Q{i + 1}. {q.question}</p>
                <ul className="list-disc ml-6">
                  {q.options.map((opt, j) => (
                    <li key={j} className={opt === q.answer ? 'text-green-600 font-bold' : ''}>{opt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {!isPro && (
            <p className="text-yellow-900 bg-yellow-100 p-2 mt-4 rounded">
              👀 Only 2 quiz questions shown for free users.  
              <a className="underline ml-1 text-blue-600" href="/pricing">Upgrade to Pro</a>
            </p>
          )}
        </section>
      )}
    </div>
  );
}