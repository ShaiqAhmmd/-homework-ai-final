'use client'

export default function ChatPreviewSection() {
  return (
    <section className="w-full bg-white dark:bg-neutral-900 py-16 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">See It In Action</h2>
        <p className="text-gray-600 dark:text-gray-300">
          See how our AI breaks down real homework step-by-step.
        </p>
      </div>

      <div className="bg-gray-100 dark:bg-neutral-800 rounded-xl shadow-lg mt-10 max-w-4xl mx-auto overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-600">
          <span className="text-lg font-semibold text-gray-800 dark:text-white">🧠 Homework AI Chat</span>
          <div className="flex gap-2">
            <span className="w-3 h-3 bg-red-400 rounded-full" />
            <span className="w-3 h-3 bg-yellow-400 rounded-full" />
            <span className="w-3 h-3 bg-green-400 rounded-full" />
          </div>
        </div>

        <div className="p-6 space-y-6 text-left">
          <div className="flex justify-end">
            <div className="bg-blue-600 text-white px-4 py-2 rounded-lg rounded-bl-none max-w-md">
              What is the integral of x²?
            </div>
          </div>

          <div className="flex justify-start">
            <div className="bg-gray-200 dark:bg-gray-700 px-4 py-3 rounded-lg rounded-br-none text-black dark:text-white max-w-md">
              <p><b>Step 1:</b> ∫x² dx</p>
              <p><b>Step 2:</b> Use ∫xⁿ dx = xⁿ⁺¹ / (n+1) + C</p>
              <p><b>Step 3:</b> ∫x² = x³ / 3 + C</p>
              <p><b>Answer:</b> x³ / 3 + C ✅</p>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="bg-blue-600 text-white px-4 py-2 rounded-lg rounded-bl-none max-w-md">
              Can you verify this?
            </div>
          </div>

          <div className="flex justify-start">
            <div className="bg-gray-200 dark:bg-gray-700 px-4 py-3 rounded-lg rounded-br-none text-black dark:text-white max-w-md">
              Sure! d/dx(x³ / 3 + C) = x² ✅  
              <br />
              It matches!
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}