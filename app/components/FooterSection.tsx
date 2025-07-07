'use client'
import { useState } from "react";

export default function FooterSection() {
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("You've joined the waitlist! (Not implemented)");
    setEmail("");
  }

  return (
    <footer className="mt-16 w-full">
      {/* Waitlist - full width */}
      <div className="bg-indigo-600 py-10 text-center text-white w-full">
        <h3 className="text-2xl font-bold mb-2">Join Our Waitlist for Early Access</h3>
        <p className="mb-6">Be the first to know about new features and exclusive offers.</p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-xl mx-auto"
        >
          <input
            type="email"
            required
            placeholder="Your email address"
            className="rounded-md px-4 py-2 text-gray-900 w-full sm:w-auto"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="bg-white text-indigo-700 font-semibold px-6 py-2 rounded-md hover:bg-indigo-100 transition"
          >
            Join Now
          </button>
        </form>
      </div>

      {/* Main Footer - full width background */}
      <div className="bg-gray-900 text-gray-200 pt-12 pb-6 px-4 w-full">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 pb-8">
          <div>
            <div className="font-bold mb-3 text-white">Product</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Features</a></li>
              <li><a href="#" className="hover:underline">Pricing</a></li>
              <li><a href="/faq" className="hover:underline">FAQ</a></li>
              <li><a href="#" className="hover:underline">Changelog</a></li>
              <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:underline">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <div className="font-bold mb-3 text-white">Resources</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Blog</a></li>
              <li><a href="#" className="hover:underline">Tutorials</a></li>
              <li><a href="#" className="hover:underline">Support</a></li>
              <li><a href="#" className="hover:underline">API Docs</a></li>
              <li><a href="/feedback" className="hover:underline">Feedback</a></li>
            </ul>
          </div>
          <div>
            <div className="font-bold mb-3 text-white">Company</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Privacy</a></li>
              <li><a href="#" className="hover:underline">Terms</a></li>
              <li><a href="/contact" className="hover:underline">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <div className="font-bold mb-3 text-white">Legal</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Terms of Service</a></li>
              <li><a href="#" className="hover:underline">Cookie Policy</a></li>
              <li><a href="#" className="hover:underline">GDPR</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            © 2024 Homework AI. All rights reserved.<br />
            Built by <span className="text-white font-semibold">@shaiq</span> (15 y/o Indie Dev)
          </div>
          <div className="flex gap-4 text-2xl">
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" title="Twitter">🐦</a>
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" title="Instagram">📸</a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" title="LinkedIn">💼</a>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" title="GitHub">💻</a>
          </div>
        </div>
      </div>
    </footer>
  );
}