const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY! // Set this in your .env.local

async function callTogetherAI(prompt: string) {
  const res = await fetch('https://api.together.xyz/v1/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TOGETHER_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'meta-llama/Llama-3-8b-chat-hf',
      prompt,
      max_tokens: 512,
      temperature: 0.2,
      stop: null
    })
  })
  const data = await res.json()
  return data.choices?.[0]?.text?.trim() || ''
}

export async function getAISummary(text: string) {
  return callTogetherAI(`Summarize this PDF for a student in 3-5 sentences:\n\n${text}`)
}

export async function getAIQuestions(text: string) {
  return callTogetherAI(`Extract all questions (MCQ, short, long) from this PDF text. List each question on a new line:\n\n${text}`)
}

export async function getAIKeywords(text: string) {
  return callTogetherAI(`List the most important keywords, formulas, and definitions from this PDF text. Separate by commas:\n\n${text}`)
}

export async function getAISubject(text: string) {
  return callTogetherAI(`What school subject does this PDF belong to? (e.g. Physics, English, History, etc.)\n\n${text}`)
}

export async function getAIAnswer(text: string, question: string) {
  return callTogetherAI(`Based on this PDF content:\n${text}\n\nAnswer this question for a student:\n${question}`)
}