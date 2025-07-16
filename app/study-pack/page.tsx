import StudyPackGenerator from '../components/StudyPackGenerator';

export default function StudyPackPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">🎓 Study Pack Generator</h1>
      <p className="text-gray-600 mb-8">
        Paste your notes, textbook, or upload a PDF or image to automatically generate AI-powered study tools.
      </p>
      <StudyPackGenerator />
    </div>
  );
}