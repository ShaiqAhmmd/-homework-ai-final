'use client'
import { useState } from "react";

const faqs = [
  { q: "Is Homework AI cheating?", a: "Homework AI is designed as a learning tool, not a cheating tool. We emphasize step-by-step explanations and conceptual understanding to help students learn, rather than just providing answers." },
  { q: "How accurate are the explanations?", a: "Our AI explanations have a 98% accuracy rate for common homework questions. We continuously improve our models and welcome feedback if you spot any errors." },
  { q: "What subjects are covered?", a: "We cover all core subjects from middle school through college including Math, Science, History, Literature and Languages. Check our Subjects section for details." },
  { q: "Is my data secure?", a: "Absolutely. We don't store your homework questions after processing and use enterprise-grade security to protect all user data." },
  { q: "Can I cancel anytime?", a: "Yes! There are no long-term contracts. You can cancel your premium subscription anytime." },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
        Frequently Asked Questions
      </h2>
      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border-b border-gray-200">
            <button
              className="w-full text-left py-5 focus:outline-none flex justify-between items-center"
              onClick={() => setOpen(open === idx ? null : idx)}
            >
              <span className="font-semibold text-lg text-gray-900">{faq.q}</span>
              <span className="text-2xl text-gray-400">
                {open === idx ? "–" : "+"}
              </span>
            </button>
            {open === idx && (
              <div className="pb-5 text-gray-700 text-base">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}