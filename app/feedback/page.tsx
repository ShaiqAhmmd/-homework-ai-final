import FeedbackForm from '../components/FeedbackForm'

export default function FeedbackPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Feedback & Suggestions</h1>
      <p className="mb-6 text-gray-600">
        What should we build next? Have an idea, feature request, or found a bug? Let us know!
      </p>
      <FeedbackForm />
    </div>
  );
}