export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 bg-white rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
      <ul className="list-disc list-inside mb-4 space-y-2">
        <li>
          <b>Use of Service:</b> Homework AI is for educational purposes only. Do not use it to cheat or submit AI-generated work as your own.
        </li>
        <li>
          <b>Account:</b> You are responsible for your account and activity.
        </li>
        <li>
          <b>Content:</b> We do not guarantee the accuracy of AI answers. Always double-check important information.
        </li>
        <li>
          <b>Prohibited Use:</b> Do not use Homework AI for illegal, harmful, or abusive activities.
        </li>
        <li>
          <b>Changes:</b> We may update these terms at any time. Continued use means you accept the new terms.
        </li>
        <li>
          <b>Contact:</b> For questions, email <a href="mailto:shaiqahmad33@gmail.com" className="text-blue-600 underline">shaiqahmad33@gmail.com</a>
        </li>
      </ul>
      <p className="text-gray-500 text-sm">Last updated: July 2024</p>
    </div>
  );
}