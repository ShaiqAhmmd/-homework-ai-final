'use client';

import { useState } from 'react';
import ExportCSVButton from './ExportCSVButton';
import ExportPDFButton from './ExportPDFButton';
import { useUserInfo } from '@/hooks/useUserInfo';

export default function StudyPackGenerator() {
  const [input, setInput] = useState('');
  const [summary, setSummary] = useState('');
  const [flashcards, setFlashcards] = useState<{ q: string; a: string }[]>([]);
  const [quiz, setQuiz] = useState<{ question: string; options: string[]; answer: string }[]>([]);
  const [warning, setWarning] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { isPro } = useUserInfo();

  // ✅ Upload Handler
  async function handleUpload(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/pdf-analyzer/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data && data.text) {
        setInput(data.text); // don't trim!
        setWarning('');
      } else {
        alert(data.error || '❌ Failed to extract readable text.');
      }
    } catch (err) {
      console.error('Upload failed:', err);
      alert('❌ File upload error');
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  // ✅ Study Pack Gen
  async function generatePack() {
    if (!input.trim()) return;

    setLoading(true);
    setError('');
    setSummary('');
    setFlashcards([]);
    setQuiz([]);
    setWarning('');

    const fullText = input.trim();
    const limit = 8000;
    const limitedText = fullText.slice(0, limit);

    if (fullText.length > limit) {
      setWarning('⚠️ Only the first 8000 characters were analyzed due to AI limits.');
    }

    try {
      const res = await fetch('/api/pdf-analyzer/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: limitedText }),
      });

      const data = await res.json();
      setSummary(data.summary || '');
      setFlashcards(data.flashcards || []);
      setQuiz(data.mcqs || []);
    } catch {
      setError('❌ Generation failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <textarea
        className="w-full border border-gray-300 rounded p-3 mb-4 text-sm"
        rows={6}
        placeholder="Paste your notes or lecture..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="flex items-center gap-4 mb-4">
        <label className="cursor-pointer bg-gray-100 px-4 py-2 border rounded hover:bg-gray-200 transition">
          📂 Upload PDF or Image
          <input type="file" accept=".pdf,image/*" hidden onChange={handleFileChange} />
        </label>

        <button
          onClick={generatePack}
          disabled={loading}
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition disabled:opacity-50"
        >
          {loading ? 'Generating...' : '🎓 Generate Study Pack'}
        </button>
      </div>

      {/* Warning */}
      {warning && (
        <p className="text-yellow-800 bg-yellow-100 p-2 rounded text-sm mb-4">{warning}</p>
      )}

      {error && <p className="text-red-600">{error}</p>}

      {/* SUMMARY */}
      {summary && (
        <section className="mb-6">
          <h3 className="text-xl font-bold mb-2">📝 Summary</h3>
          <div className="p-4 bg-white border rounded whitespace-pre-wrap">{summary}</div>
          <ExportPDFButton content={summary} filename="summary.pdf" />
        </section>
      )}

      {/* FLASHCARDS */}
      {flashcards.length > 0 && (
        <section className="mb-6">
          <h3 className="text-xl font-bold mb-2">🧠 Flashcards</h3>
          {isPro ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {flashcards.map((card, i) => (
                  <div key={i} className="bg-blue-50 p-3 rounded shadow border">
                    <p><strong>Q:</strong> {card.q}</p>
                    <p className="text-green-700"><strong>A:</strong> {card.a}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-3">
                <ExportCSVButton data={flashcards} filename="flashcards.csv" />
                <ExportPDFButton content={flashcards.map(card => `Q: ${card.q}\nA: ${card.a}`).join('\n\n')} filename="flashcards.pdf" />
              </div>
            </>
          ) : (
            <p className="text-yellow-900 bg-yellow-100 p-2 rounded">
              🔒 Exporting flashcards is a Pro feature.  
              <a href="/pricing" className="underline ml-1 text-blue-600">Upgrade</a>
            </p>
          )}
        </section>
      )}

      {/* QUIZ */}
      {quiz.length > 0 && (
        <section className="mb-6">
          <h3 className="text-xl font-bold mb-2">🧪 Quiz</h3>
          <div className="space-y-6">
            {quiz.slice(0, isPro ? quiz.length : 2).map((q, i) => (
              <div key={i} className="bg-white p-4 border rounded shadow-sm">
                <p className="font-semibold mb-2">Q{i + 1}. {q.question}</p>
                <ul className="list-disc ml-6">
                  {q.options.map((opt, j) => (
                    <li key={j} className={opt === q.answer ? 'text-green-600 font-bold' : ''}>
                      {opt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {!isPro && (
            <p className="text-yellow-900 bg-yellow-100 p-2 mt-3 rounded">
              Only Pro users see full quiz.  
              <a href="/pricing" className="underline text-blue-600 ml-1">Upgrade</a>
            </p>
          )}
        </section>
      )}
    </section>
  );
}