'use client'
import { useState } from 'react'

const shareUrl = 'https://homework-ai-final.vercel.app/'
const shareText = encodeURIComponent("Try this free AI homework solver → ")

export default function SocialShareButtons() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Share with Friends</h2>
        <p className="text-gray-600 mb-6">Help others discover Homework AI. Sharing is caring 🧠</p>

        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded bg-gray-200 text-sm text-black hover:bg-gray-300"
          >
            {copied ? 'Copied ✅' : 'Copy Link'}
          </button>
          <a className="bg-green-100 text-green-900 px-4 py-2 rounded text-sm" href={`https://wa.me/?text=${shareText}${shareUrl}`} target="_blank">WhatsApp</a>
          <a className="bg-blue-100 text-blue-600 px-4 py-2 rounded text-sm" href={`https://twitter.com/intent/tweet?text=${shareText}${shareUrl}`} target="_blank">Twitter/X</a>
          <a className="bg-blue-100 text-blue-700 px-4 py-2 rounded text-sm" href={`https://facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank">Facebook</a>
          <a className="bg-blue-100 text-blue-800 px-4 py-2 rounded text-sm" href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank">LinkedIn</a>
        </div>
      </div>
    </section>
  )
}