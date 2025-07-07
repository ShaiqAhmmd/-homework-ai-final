export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 bg-white rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        <b>Homework AI</b> respects your privacy. We do not sell or share your personal information with third parties.
      </p>
      <ul className="list-disc list-inside mb-4 space-y-2">
        <li>
          <b>Information Collection:</b> We collect only the information you provide (such as your email, questions, or messages).
        </li>
        <li>
          <b>Usage:</b> Your data is used solely to provide AI answers and improve our service.
        </li>
        <li>
          <b>Security:</b> We use industry-standard security to protect your data.
        </li>
        <li>
          <b>Third-Party Services:</b> We use AI APIs (e.g., Together.ai) to generate answers. Your questions may be sent to these services for processing.
        </li>
        <li>
          <b>Contact:</b> For privacy questions, email <a href="mailto:shaiqahmad33@gmail.com" className="text-blue-600 underline">shaiqahmad33@gmail.com</a>
        </li>
      </ul>
      <p className="text-gray-500 text-sm">Last updated: July 2024</p>
    </div>
  );
}