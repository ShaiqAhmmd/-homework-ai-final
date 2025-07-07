export default function TipsCard() {
  return (
    <div className="bg-yellow-100 border border-yellow-300 rounded-md p-5 text-yellow-900 max-w-3xl mx-auto shadow-sm">
      <h3 className="font-semibold text-lg mb-2">📝 Tips for best results:</h3>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Be specific with your questions</li>
        <li>For math problems, include the full equation</li>
        <li>For science, mention the topic or law</li>
        <li>You can paste text, or upload a clear photo</li>
        <li>Select a response style that matches your need</li>
      </ul>
    </div>
  )
}