'use client'

export default function ChatPreviewSection() {
  return (
    <section className="bg-white dark:bg-neutral-900 py-16 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">See It In Action</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Watch how our AI breaks down complex problems into easy-to-understand steps
        </p>
      </div>

      <div className="bg-gray-100 dark:bg-neutral-800 rounded-xl shadow-lg mt-10 max-w-4xl mx-auto overflow-hidden">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <span className="text-lg font-semibold text-gray-700 dark:text-white">
            🧠 Homework AI Chat
          </span>
          <div className="flex gap-2">
            <span className="w-3 h-3 bg-red-400 rounded-full" />
            <span className="w-3 h-3 bg-yellow-400 rounded-full" />
            <span className="w-3 h-3 bg-green-400 rounded-full" />
          </div>
        </div>

        {/* Chat Content */}
        <div className="p-6 space-y-6 text-left">
          {/* User Message */}
          <div className="flex items-start gap-2">
            <div className="bg-blue-600 text-white px-4 py-2 rounded-lg rounded-bl-none max-w-md ml-auto">
              What is the integral of x²?
            </div>
          </div>

          {/* AI Reply */}
          <div className="flex items-start gap-2">
            <div className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-3 rounded-lg rounded-br-none max-w-md">
              <p><b>Step 1:</b> The integral of x² is ∫x² dx</p>
              <p><b>Step 2:</b> Using the power rule: ∫xⁿ dx = xⁿ⁺¹ / (n+1) + C</p>
              <p><b>Step 3:</b> For x²: ∫x² = x³ / 3 + C ✅</p>
              <p><b>Answer:</b> x³ / 3 + C</p>
            </div>
          </div>

          {/* User Follow-up */}
          <div className="flex items-start gap-2">
            <div className="bg-blue-600 text-white px-4 py-2 rounded-lg rounded-bl-none max-w-md ml-auto">
              Can you show me how to verify this answer?
            </div>
          </div>

          {/* AI Reply 2 */}
          <div className="flex items-start gap-2">
            <div className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-3 rounded-lg rounded-br-none max-w-md">
              Sure! Let’s verify it by taking the derivative:  
              <br />  
              d/dx(x³ / 3 + C) = x² ✅  
              <br />
              It matches, so it's correct! 🎉
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}