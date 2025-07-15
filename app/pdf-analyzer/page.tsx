'use client';

import { useState } from 'react';
import { FileText, Upload, Download } from 'lucide-react';

export default function PDFAnalyzerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [ai, setAI] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Sample PDFs
  const samplePDFs = [
    {
      name: 'Physics Notes Sample',
      url: 'https://arxiv.org/pdf/quant-ph/0401010.pdf',
    },
    {
      name: 'Chemistry Sample',
      url: 'https://chem.libretexts.org/api/deki/files/183/Chapter_1.pdf',
    },
  ];

  // 1. Handle file upload
  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setFile(file);
    setLoading(true);
    setError(null);
    setAI(null);
    setText('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('https://homework-ai-final-production.up.railway.app/extract', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (!data.text) {
        setError('Failed to extract text from PDF.');
        setLoading(false);
        return;
      }

      setText(data.text);

      // 2. Send to your AI backend
      const res2 = await fetch('/api/pdf-analyzer/analyze', {
        method: 'POST',
        body: JSON.stringify({ text: data.text }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const aiData = await res2.json();
      setAI(aiData);
    } catch (e) {
      setError('Something went wrong. Please try again.');
    }

    setLoading(false);
  }

  // 2. Handle sample PDFs
  async function handleSample(url: string) {
    setLoading(true);
    setError(null);
    setAI(null);
    setText('');

    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const name = url.split('/').pop() || 'sample.pdf';
      const file = new File([blob], name, { type: 'application/pdf' });

      setFile(file);

      await handleUpload({ target: { files: [file] } } as any);
    } catch (e) {
      setError('Failed to load sample PDF');
    }

    setLoading(false);
  }

  // 3. Export to .txt
  function exportText() {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = (file?.name || 'extracted') + '.txt';
    a.click();
    URL.revokeObjectURL(url);
  }

  // 4. Export flashcards to CSV
  function exportFlashcardsCSV() {
    if (!ai?.flashcards?.length) return;
    const csv =
      'Question,Answer\n' +
      ai.flashcards
        .map((f: { q: string; a: string }) => `"${f.q.replace(/"/g, '')}","${f.a.replace(/"/g, '')}"`)
        .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = (file?.name || 'flashcards') + '.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      {/* Title */}
      <h1 className="text-3xl font-extrabold mb-2 flex items-center justify-center gap-2">
        <FileText size={32} /> PDF Analyzer
      </h1>
      <p className="text-gray-600 mb-4 text-center">
        Instantly extract summaries, questions, flashcards, and quizzes from any textbook or notes PDF.<br />
        <span className="block text-blue-600 font-semibold">Save hours of study time with AI-powered insights!</span>
      </p>

      {/* Upload Controls */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => document.getElementById('pdf-upload')?.click()}
        >
          <Upload size={18} /> Upload PDF
        </button>
        <input
          id="pdf-upload"
          type="file"
          accept="application/pdf"
          onChange={handleUpload}
          className="hidden"
        />

        <button
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          onClick={exportText}
          disabled={!text}
        >
          <FileText size={18} /> Export Text
        </button>

        <button
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          onClick={exportFlashcardsCSV}
          disabled={!ai?.flashcards?.length}
        >
          <Download size={18} /> Export Flashcards (CSV)
        </button>
      </div>

      {/* Sample PDF Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {samplePDFs.map((pdf) => (
          <button
            key={pdf.url}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-sm rounded"
            onClick={() => handleSample(pdf.url)}
          >
            Browse: {pdf.name}
          </button>
        ))}
      </div>

      {/* AI Output */}
      {loading && (
        <div className="text-blue-600 mb-4">Extracting text from PDF or generating flashcards...</div>
      )}

      {error && <div className="text-red-600 mb-4">{error}</div>}

      {file && <div className="text-sm text-gray-700 mb-2">File: {file.name}</div>}

      {text && (
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Extracted Text (first 500 chars):</h2>
          <div className="bg-gray-100 p-2 rounded text-xs max-h-40 overflow-y-auto">
            {text.slice(0, 500)}
            {text.length > 500 && '...'}
          </div>
        </div>
      )}

      {ai?.warning && (
        <div className="bg-yellow-100 text-yellow-800 p-2 mb-4 rounded">
          {ai.warning}
        </div>
      )}

      {ai && (
        <div className="space-y-8">
          <div>
            <h2 className="font-semibold mb-2">Summary</h2>
            <div className="bg-gray-50 p-2 rounded">{ai.summary}</div>
          </div>

          <div>
            <h2 className="font-semibold mb-2">Questions</h2>
            {ai.questions?.length ? (
              <ul className="list-disc ml-6">
                {ai.questions.map((q: string, i: number) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            ) : (
              <div className="text-gray-400">No questions generated.</div>
            )}
          </div>

          <div>
            <h2 className="font-semibold mb-2">Flashcards</h2>
            {ai.flashcards?.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ai.flashcards.map((f: { q: string; a: string }, i: number) => (
                  <div key={i} className="bg-white border p-3 shadow-sm">
                    <p className="font-semibold text-blue-700 mb-1">Q: {f.q}</p>
                    <p className="text-gray-700">A: {f.a}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-400">No flashcards generated yet.</div>
            )}
          </div>

          {/* ✅ MCQ Section */}
          <div>
            <h2 className="font-semibold mb-2">MCQ Quiz</h2>
            {ai.mcqs?.length ? (
              <ul className="space-y-6">
                {ai.mcqs.map(
                  (
                    mcq: {
                      q: string;
                      options: string[];
                      answer: string;
                      explanation: string;
                    },
                    i: number
                  ) => (
                    <li key={i} className="bg-white border p-4 rounded shadow">
                      <p className="font-medium mb-2">
                        <span className="text-purple-600">Q{i + 1}:</span> {mcq.q}
                      </p>
                      <ul className="ml-4 mb-2 list-disc">
                        {mcq.options.map((opt: string, j: number) => (
                          <li key={j}>{opt}</li>
                        ))}
                      </ul>
                      <p className="text-green-600">
                        <strong>Answer:</strong> {mcq.answer}
                      </p>
                      <p className="text-gray-600 text-sm">
                        <strong>Explanation:</strong> {mcq.explanation}
                      </p>
                    </li>
                  )
                )}
              </ul>
            ) : (
              <div className="text-gray-400">No MCQs generated yet.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}