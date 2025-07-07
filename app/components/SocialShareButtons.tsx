'use client'
import { useEffect, useState } from "react";

export default function SocialShareButtons() {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  function copyLink() {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!url) return null;

  const text = encodeURIComponent("Check out Homework AI – Instantly solve your toughest homework questions with AI!");
  const shareUrl = encodeURIComponent(url);

  return (
    <div className="flex flex-wrap gap-3 mt-6">
      <button
        onClick={copyLink}
        className="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200 transition"
      >
        {copied ? "Copied!" : "Copy Link"}
      </button>
      <a
        href={`https://wa.me/?text=${text}%20${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-100 text-green-700 px-4 py-2 rounded hover:bg-green-200 transition"
      >
        WhatsApp
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200 transition"
      >
        Twitter/X
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-200 text-blue-900 px-4 py-2 rounded hover:bg-blue-300 transition"
      >
        Facebook
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${text}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-50 text-blue-800 px-4 py-2 rounded hover:bg-blue-100 transition"
      >
        LinkedIn
      </a>
      <a
        href={`https://t.me/share/url?url=${shareUrl}&text=${text}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-300 text-blue-900 px-4 py-2 rounded hover:bg-blue-400 transition"
      >
        Telegram
      </a>
    </div>
  );
}