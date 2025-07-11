'use client'

export default function HowItWorksSection() {
  return (
    <section className="bg-gray-100 dark:bg-neutral-900 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">How It Works</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Get homework help in three simple steps – it's that easy!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 max-w-6xl mx-auto">
        {/* Step 1 */}
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6 text-center">
          <div className="text-4xl mb-4">📸</div>
          <h3 className="font-semibold text-lg mb-1">Step 1: Snap or Type</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Upload a photo of your homework or type your question directly.
          </p>
        </div>

        {/* Step 2 */}
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6 text-center">
          <div className="text-4xl mb-4">🧠</div>
          <h3 className="font-semibold text-lg mb-1">Step 2: AI Analyzes</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Our AI reads, understands, and breaks down your problem step-by-step.
          </p>
        </div>

        {/* Step 3 */}
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6 text-center">
          <div className="text-4xl mb-4">✅</div>
          <h3 className="font-semibold text-lg mb-1">Step 3: Get Solution</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Get instant, clear solutions with optional follow-up questions.
          </p>
        </div>
      </div>
    </section>
  )
}