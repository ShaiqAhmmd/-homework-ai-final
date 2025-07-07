import Link from "next/link";
import WaitlistForm from '../components/WaitlistForm'

type Feature = {
  label: string;
  free: string;
  pro: string;
};

const features: Feature[] = [
  { label: "AI answers (per day)", free: "50", pro: "Unlimited" },
  { label: "Image OCR (photo to text)", free: "✓", pro: "✓" },
  { label: "Real-time chat", free: "✓", pro: "✓" },
  { label: "PDF upload & summary", free: "✓", pro: "✓" },
  { label: "Save question history", free: "✓", pro: "✓" },
  { label: "Priority AI speed", free: "✗", pro: "✓" },
  { label: "Email support", free: "✗", pro: "✓" },
];

export default function PricingSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <h2 className="text-4xl font-extrabold mb-2 text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        Pricing & Plans
      </h2>
      <p className="text-lg text-gray-600 mb-10 text-center">
        Start free. Upgrade anytime for unlimited AI power!
      </p>
      <div className="flex flex-col md:flex-row gap-8 justify-center">
        {/* Free Plan */}
        <div className="bg-white rounded-2xl shadow-xl p-8 w-80 flex flex-col items-center border-2 border-blue-200">
          <h3 className="text-2xl font-bold mb-2 text-blue-600">Free</h3>
          <div className="text-4xl font-extrabold mb-4">$0</div>
          <ul className="mb-6 w-full">
            {features.map(f => (
              <li key={`free-${f.label}`} className="flex justify-between py-1 border-b last:border-b-0 text-gray-700">
                <span>{f.label}</span>
                <span>{f.free}</span>
              </li>
            ))}
          </ul>
          <button
            className="bg-gray-200 text-gray-700 font-bold px-6 py-2 rounded-lg cursor-not-allowed"
            disabled
          >
            Current Plan
          </button>
        </div>
        {/* Pro Plan */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-80 flex flex-col items-center border-2 border-purple-400 scale-105">
          <h3 className="text-2xl font-bold mb-2 text-purple-600 flex items-center">
            Pro
            <span className="inline-block bg-yellow-200 text-yellow-800 text-xs font-bold px-2 py-1 rounded ml-2 align-middle">
              Coming Soon
            </span>
          </h3>
          <div className="text-4xl font-extrabold mb-4">$9<span className="text-lg font-normal">/mo</span></div>
          <ul className="mb-6 w-full">
            {features.map(f => (
              <li key={`pro-${f.label}`} className="flex justify-between py-1 border-b last:border-b-0 text-gray-700">
                <span>{f.label}</span>
                <span>{f.pro}</span>
              </li>
            ))}
          </ul>
          <button
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold px-6 py-2 rounded-lg shadow hover:scale-105 transition"
            disabled
          >
            Go Pro (Coming Soon)
          </button>
          <div className="mt-2 text-xs text-gray-400 italic">Cancel anytime. No credit card required for free plan.</div>
        </div>
      </div>
      <div className="mt-10 text-center text-gray-500">
        <span className="font-semibold">Questions?</span> Email us at{" "}
        <a href="mailto:shaiqahmad33@gmail.com" className="text-blue-600 underline">shaiqahmad33@gmail.com</a>
      </div>
      <WaitlistForm />
    </section>
  );
}