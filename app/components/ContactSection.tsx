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
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
        Need Help? Contact Us
      </h2>
      <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto">
        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow p-8 flex-1 space-y-4"
        >
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input
              className="w-full border border-gray-300 rounded-md p-2"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              className="w-full border border-gray-300 rounded-md p-2"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Subject</label>
            <select
              className="w-full border border-gray-300 rounded-md p-2"
              name="subject"
              value={form.subject}
              onChange={handleChange}
            >
              <option>General Question</option>
              <option>Technical Support</option>
              <option>Feedback</option>
              <option>Business Inquiry</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Message</label>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2 min-h-[80px]"
              name="message"
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-400 to-purple-400 text-white font-semibold py-2 px-6 rounded-lg shadow hover:opacity-90 transition"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
        {/* Contact Info */}
        <div className="bg-white rounded-xl shadow p-8 flex-1 space-y-4">
          <div>
            <div className="font-bold mb-2">Other Ways to Reach Us</div>
            <div className="mb-2">
              <span className="font-semibold">Email Support</span><br />
              <a href="mailto:shaiqahmad33@gmail.com" className="text-blue-600 hover:underline">
                shaiqahmad33@gmail.com
              </a>
            </div>
            <div className="mb-2">
              <span className="font-semibold">Phone</span><br />
              <a href="tel:03121496662" className="text-blue-600 hover:underline">
                03121496662
              </a>
            </div>
            <div>
              <span className="font-semibold">Social</span><br />
              <div className="flex gap-3 mt-1 text-2xl">
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" title="Twitter">🐦</a>
                <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" title="Instagram">📸</a>
                <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" title="LinkedIn">💼</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}