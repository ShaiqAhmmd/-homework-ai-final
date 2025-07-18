'use client';

import { useState } from 'react';
import ExportCSVButton from './ExportCSVButton';
import ExportPDFButton from './ExportPDFButton';
import { useUserInfo } from '@/hooks/useUserInfo';

type MCQ = {
  question: string;
  options: string[];
  answer: string;
  explanation?: string; // Made optional
};

function parsePlainTextMCQs(raw: string): MCQ[] {
  const questions: MCQ[] = [];
  const blocks = raw.split(/\nQ\d+\./).filter(Boolean);

  blocks.forEach(block => {
    const lines = block.trim().split('\n').map(l => l.trim());
    const question = lines[0];
    const options = lines.slice(1, 5);
    const answerLine = lines.find(l => l.startsWith('Answer:')) || '';
    const answer = answerLine.replace('Answer:', '').trim();

    if (question && options.length === 4) {
      questions.push({ question, options, answer });
    }
  });

  return questions;
}

export default function StudyPackGenerator() {
  const [input, setInput] = useState('');
  const [summary, setSummary] = useState('');
  const [flashcards, setFlashcards] = useState<{ q: string; a: string }[]>([]);
  const [mcqs, setMcqs] = useState<MCQ[]>([]);
  const [warning, setWarning] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { isPro } = useUserInfo();

  async function handleUpload(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_PDF_BACKEND_URL}/extract`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.text) {
        setInput(data.text);
        setWarning('');
      } else {
        alert(data.error || 'Failed to extract text from uploaded file.');
      }
    } catch (err) {
      alert('Upload failed. Try again.');
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  async function generatePack() {
    if (!input.trim()) return;

    setLoading(true);
    setError('');
    setSummary('');
    setFlashcards([]);
    setMcqs([]);
    setWarning('');

    const maxChars = 8000;
    const limitedText = input.length > maxChars ? input.slice(0, maxChars) : input;

    if (input.length > maxChars) {
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
      setWarning(data.warning || '');

      if (data.mcqRaw) {
        const parsedMCQs = parsePlainTextMCQs(data.mcqRaw);
        setMcqs(parsedMCQs);
      } else {
        setMcqs([]);
      }
    } catch {
      setError('Failed to generate study pack.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <textarea
        className="w-full border border-gray-300 rounded p-3 mb-4 text-sm"
        rows={6}
        placeholder="Paste your textbook, lecture, or notes..."
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

      {warning && (
        <p className="text-yellow-800 bg-yellow-100 p-2 rounded text-sm mb-4">{warning}</p>
      )}

      {error && <p className="text-red-600">{error}</p>}

      {summary && (
        <section className="mb-6">
          <h3 className="text-xl font-bold mb-2">📝 Summary</h3>
          <div className="p-4 bg-white border rounded whitespace-pre-wrap">{summary}</div>
          <ExportPDFButton content={summary} filename="summary.pdf" />
        </section>
      )}

      {flashcards.length > 0 && (
        <section className="mb-6">
          <h3 className="text-xl font-bold mb-2">🧠 Flashcards</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {flashcards.map((card, i) => (
              <div key={i} className="bg-blue-50 p-3 rounded shadow border">
                <p><strong>Q:</strong> {card.q}</p>
                <p className="text-green-700 mt-1"><strong>A:</strong> {card.a}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-4">
            <ExportCSVButton data={flashcards} filename="flashcards.csv" />
            <ExportPDFButton content={flashcards.map(card => `Q: ${card.q}\nA: ${card.a}`).join('\n\n')} filename="flashcards.pdf" />
          </div>
        </section>
      )}

      {mcqs.length > 0 && (
        <section className="mb-6">
          <h3 className="text-xl font-bold mb-2">🧪 Quiz</h3>
          <div className="space-y-6">
            {mcqs.map((q, i) => (
              <div key={i} className="bg-white p-4 border rounded shadow-sm">
                <p className="font-semibold mb-2">Q{i + 1}. {q.question}</p>
                <ul className="list-disc ml-6">
                  {q.options.map((opt, j) => (
                    <li key={j} className={opt.startsWith(q.answer) ? 'text-green-600 font-bold' : ''}>
                      {opt}
                    </li>
                  ))}
                </ul>
                {q.explanation && (
                  <p className="text-gray-600"><strong>Explanation:</strong> {q.explanation}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}