'use client'

import { useState } from 'react'

const shareUrl = 'https://homework-ai-final.vercel.app/' // Replace with your actual BASE URL
const shareText = encodeURIComponent("Try this AI that does your homework crazy fast! 💯👏")

export default function SocialShareButtons() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="w-full py-16 px-4 bg-white dark:bg-neutral-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
          Share with Friends
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
          Spread the word and help others discover Homework AI. Let's make studying smart.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={handleCopy}
            className="px-4 py-2 text-sm rounded bg-gray-100 dark:bg-neutral-700 hover:bg-gray-200 dark:hover:bg-neutral-600 text-gray-700 dark:text-white"
          >
            {copied ? 'Copied ✅' : 'Copy Link'}
          </button>

          <a
            href={`https://wa.me/?text=${shareText} %0A${shareUrl}`}
            target="_blank"
            className="bg-green-200 text-green-900 px-4 py-2 text-sm rounded hover:bg-green-300"
          >
            WhatsApp
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${shareText}%0A${shareUrl}`}
            target="_blank"
            className="bg-blue-100 text-blue-600 px-4 py-2 text-sm rounded hover:bg-blue-200"
          >
            Twitter/X
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
            target="_blank"
            className="bg-blue-100 text-blue-700 px-4 py-2 text-sm rounded hover:bg-blue-200"
          >
            Facebook
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
            target="_blank"
            className="bg-blue-100 text-blue-800 px-4 py-2 text-sm rounded hover:bg-blue-200"
          >
            LinkedIn
          </a>
          <a
            href={`https://t.me/share/url?url=${shareUrl}&text=${shareText}`}
            target="_blank"
            className="bg-blue-100 text-blue-700 px-4 py-2 text-sm rounded hover:bg-blue-200"
          >
            Telegram
          </a>
        </div>
      </div>
    </section>
  )
}