import FlashcardGenerator from '../components/FlashcardGenerator'
import EssayGrader from '../components/EssayGrader'

export default function StudyToolsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-10">
      <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        AI-Powered Study Tools
      </h1>
      <div className="max-w-3xl mx-auto space-y-12">
        <FlashcardGenerator />
        <EssayGrader />
      </div>
    </div>
  );
}