'use client'

export default function HowItWorksSection() {
  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800">How It Works</h2>
        <p className="text-gray-600 mt-2">
          Get AI-powered homework help in just 3 simple steps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-6xl mx-auto">
        {/* Step 1 */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm p-6 text-center hover:shadow-md transition">
          <div className="text-4xl mb-4">📸</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Step 1: Snap or Type</h3>
          <p className="text-sm text-gray-600">
            Upload a photo of your homework or just start typing the question.
          </p>
        </div>

        {/* Step 2 */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm p-6 text-center hover:shadow-md transition">
          <div className="text-4xl mb-4">🧠</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Step 2: AI Analyzes</h3>
          <p className="text-sm text-gray-600">
            Our AI understands, explains, and breaks down your question step-by-step.
          </p>
        </div>

        {/* Step 3 */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm p-6 text-center hover:shadow-md transition">
          <div className="text-4xl mb-4">✅</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Step 3: Get Solution</h3>
          <p className="text-sm text-gray-600">
            Get clear answers, explanations, and even follow-up help — instantly.
          </p>
        </div>
      </div>
    </section>
  )
}