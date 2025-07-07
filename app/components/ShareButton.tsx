'use client'
import { useState, useEffect } from "react";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  function copyLink() {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // Only render the buttons when the URL is available (client-side)
  if (!url) return null;

  return (
    <div className="flex gap-2 mt-4">
      <button
        onClick={copyLink}
        className="bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200 transition"
      >
        {copied ? "Copied!" : "Copy Link"}
      </button>
      <a
        href={`https://wa.me/?text=${encodeURIComponent("Check out Homework AI: " + url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-100 text-green-700 px-4 py-2 rounded hover:bg-green-200 transition"
      >
        Share on WhatsApp
      </a>
    </div>
  );
}