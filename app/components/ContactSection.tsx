'use client'
import { useState } from "react";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "General Question",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        alert("Message sent!");
        setForm({
          name: "",
          email: "",
          subject: "General Question",
          message: "",
        });
      } else {
        alert("Failed to send message.");
      }
    } catch {
      alert("Failed to send message.");
    }
    setLoading(false);
  }

  return (
  <section className="w-full bg-white dark:bg-neutral-900 py-16 px-4">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
        Need Help? Contact Us
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 dark:bg-neutral-800 p-6 rounded-xl shadow-sm space-y-4"
        >
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-700 text-gray-800 dark:text-white outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-700 text-gray-800 dark:text-white outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Subject
            </label>
            <select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-700 text-gray-800 dark:text-white outline-none"
            >
              <option>General Question</option>
              <option>Technical Support</option>
              <option>Usage Issue</option>
              <option>Feedback</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Message
            </label>
            <textarea
              name="message"
              rows={4}
              required
              value={form.message}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-700 text-gray-800 dark:text-white outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded font-semibold hover:shadow-md transition"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        {/* Contact Info */}
        <div className="bg-gray-50 dark:bg-neutral-800 p-6 rounded-xl shadow-sm flex flex-col justify-center space-y-4 text-gray-700 dark:text-gray-300">
          <div>
            <h3 className="font-semibold mb-1 text-gray-800 dark:text-white">
              Email Support
            </h3>
            <a href="mailto:shaiqahmad33@gmail.com" className="text-blue-500 underline">
              shaiqahmad33@gmail.com
            </a>
          </div>

          <div>
            <h3 className="font-semibold mb-1 text-gray-800 dark:text-white">Phone</h3>
            <a href="tel:03121496662" className="text-blue-500 underline">
              0312 149 6662
            </a>
          </div>

          <div>
            <h3 className="font-semibold mb-1 text-gray-800 dark:text-white">
              Social
            </h3>
            <p className="text-2xl">🐦 📷 💼</p>
          </div>
        </div>
      </div>
    </div>
  </section>
)
}