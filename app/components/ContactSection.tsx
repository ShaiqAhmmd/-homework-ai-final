'use client'
import { useState } from 'react'

export default function ContactSection() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'General Question',
    message: ''
  })

  const [loading, setLoading] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (response.ok) {
        alert('Message sent!')
        setForm({ name: '', email: '', subject: 'General Question', message: '' })
      } else {
        alert('Failed to send.')
      }
    } catch {
      alert('Failed to send.')
    }

    setLoading(false)
  }

  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Need Help? Contact Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-xl shadow space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Subject</label>
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded"
              >
                <option>General Question</option>
                <option>Pro Plan</option>
                <option>Bug Report</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Message</label>
              <textarea
                name="message"
                rows={4}
                required
                value={form.message}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
            </div>

            <button
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded font-semibold"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          <div className="bg-gray-50 p-6 rounded-xl shadow space-y-4">
            <div>
              <h3 className="font-semibold">Email Support</h3>
              <a href="mailto:shaiqahmad33@gmail.com" className="text-blue-500 underline">
                shaiqahmad33@gmail.com
              </a>
            </div>
            <div>
              <h3 className="font-semibold">Phone</h3>
              <a href="tel:+923121496662" className="text-blue-500 underline">
                0312 149 6662
              </a>
            </div>
            <div>
              <h3 className="font-semibold">Social</h3>
              <p className="text-xl">🐦 📷 💼</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}