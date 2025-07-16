'use client';
import { useState } from 'react';
import ExportPDFButton from './ExportPDFButton';
import ExportCSVButton from './ExportCSVButton';
import { useUserInfo } from '@/hooks/useUserInfo';

export default function EssayGrader() {
  const [input, setInput] = useState('');
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { isPro, loading: proLoading } = useUserInfo();

  async function handleGrade(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    setGrade('');
    setFeedback('');

    try {
      const res = await fetch('/api/essay-grader', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ essay: input }),
      });

      const data = await res.json();
      setGrade(data.grade || '');
      setFeedback(data.feedback || '');
    } catch {
      setError('Failed to grade essay.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold mb-4">📝 AI Essay Grader</h2>

      <form onSubmit={handleGrade} className="bg-white p-6 space-y-4 shadow rounded">
        <textarea
          rows={6}
          placeholder="Paste your essay here..."
          className="w-full border border-gray-300 p-2 rounded resize-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition disabled:opacity-50"
        >
          {loading ? 'Grading...' : 'Grade Essay'}
        </button>

        {error && <p className="text-red-600">{error}</p>}
      </form>

      {grade && <div className="mt-4 font-bold text-lg">Grade: {grade}/10</div>}

      {feedback && (
        <>
          {proLoading ? (
            <p className="text-sm text-gray-400 mt-4">Checking Pro status...</p>
          ) : isPro ? (
            <div className="flex gap-4 my-4">
              <ExportPDFButton content={feedback} filename="essay-feedback.pdf" />
              <ExportCSVButton data={[{ feedback }]} filename="essay-feedback.csv" />
            </div>
          ) : (
            <div className="bg-yellow-100 text-yellow-900 p-3 rounded my-4">
              🔒 Export is only available to Pro users.  
              <a href="/pricing" className="ml-2 text-blue-600 underline">Upgrade to Pro</a>
            </div>
          )}

          <div className="bg-gray-100 p-4 rounded whitespace-pre-line">{feedback}</div>
        </>
      )}
    </section>
  );
}