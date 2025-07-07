'use client'
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SocialShareButtons from '../components/SocialShareButtons'

const EXAMPLE_QUESTION = "What is 7 × 8?";
const EXAMPLE_ANSWER = "7 × 8 = 56";

export default function LandingPage() {
  // Typewriter effect for the answer
  const [typed, setTyped] = useState("");
  const idx = useRef(0);

  useEffect(() => {
    setTyped("");
    idx.current = 0;
    const interval = setInterval(() => {
      setTyped(EXAMPLE_ANSWER.slice(0, idx.current + 1));
      idx.current++;
      if (idx.current >= EXAMPLE_ANSWER.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      {/* Blurred, animated background blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-pink-400 opacity-30 rounded-full filter blur-3xl animate-blob1" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-400 opacity-30 rounded-full filter blur-3xl animate-blob2" />
        <div className="absolute top-[30%] left-[60%] w-[300px] h-[300px] bg-purple-400 opacity-20 rounded-full filter blur-2xl animate-blob3" />
      </div>

      <div className="animate-float bg-white rounded-2xl shadow-2xl p-10 max-w-xl w-full text-center relative z-10">
        {/* Animated Brain Emoji */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-5xl animate-bounce drop-shadow-lg">🧠</span>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow">
            Homework <span className="text-pink-500">AI</span>
          </h1>
        </div>
        <p className="text-xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-2">
          AI-powered answers for every subject.
        </p>
        <p className="text-gray-600 mb-6">
          Instantly solve your toughest homework questions.<br />
          <span className="font-semibold text-blue-600">No signup required to try!</span>
        </p>
        {/* Example Card */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8 shadow-inner text-left border border-blue-100">
          <div className="text-gray-400 text-xs mb-1">Example:</div>
          <div className="font-semibold text-gray-800 mb-1">
            Q: {EXAMPLE_QUESTION}
          </div>
          <div className="text-green-700 font-mono text-lg flex items-center">
            <span className="mr-2">A:</span>
            <span>
              {typed}
              <span className="animate-pulse text-gray-400">{typed.length < EXAMPLE_ANSWER.length ? "|" : ""}</span>
            </span>
          </div>
        </div>
        {/* Try Now Button */}
        <Link
          href="/main"
          className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold px-10 py-3 rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 text-lg tracking-wide"
        >
          🚀 Try Now
        </Link>
        {/* Fun tagline */}
        <div className="mt-6 text-xs text-gray-400 italic">
          <span className="animate-pulse">Made for students, by students.</span>
        </div>
      </div>
      {/* Floating animation and blob keyframes */}
      <style>{`
        .animate-float {
          animation: floaty 3s ease-in-out infinite;
        }
        @keyframes floaty {
          0%, 100% { transform: translateY(0px);}
          50% { transform: translateY(-10px);}
        }
        .animate-blob1 {
          animation: blob1 12s infinite ease-in-out;
        }
        .animate-blob2 {
          animation: blob2 14s infinite ease-in-out;
        }
        .animate-blob3 {
          animation: blob3 16s infinite ease-in-out;
        }
        @keyframes blob1 {
          0%,100% { transform: scale(1) translate(0,0);}
          50% { transform: scale(1.2) translate(40px, 60px);}
        }
        @keyframes blob2 {
          0%,100% { transform: scale(1) translate(0,0);}
          50% { transform: scale(1.1) translate(-60px, -40px);}
        }
        @keyframes blob3 {
          0%,100% { transform: scale(1) translate(0,0);}
          50% { transform: scale(1.15) translate(-30px, 30px);}
        }
      `}</style>
      <SocialShareButtons />
    </div>
  );
}