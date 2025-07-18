const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY!

async function callTogetherAI(prompt: string) {
  try {
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
    if (!data.choices || !data.choices[0] || !data.choices[0].text) {
      console.error('TogetherAI error:', data)
      return '[AI error: No response]'
    }
    return data.choices[0].text.trim()
  } catch (e) {
    console.error('TogetherAI fetch error:', e)
    return '[AI error: Fetch failed]'
  }
}
export async function getAIAnswer(text: string, question: string) {
  return callTogetherAI(
    `Text:\n${text}\n\nQuestion:\n${question}\n\nAnswer:`
  )
}

export async function getAISummary(text: string) {
  return callTogetherAI(
    `Summarize this in 3-5 simple sentences:\n${text}\nSummary:`
  )
}

export async function getAIQuestions(text: string) {
  return callTogetherAI(
    `List 5-10 real questions found in this text. Only list the questions, one per line. No explanation.\n${text}\nQuestions:`
  )
}

export async function getAIFlashcards(text: string) {
  return callTogetherAI(
    `Make 5-10 flashcards from this text. Each flashcard must be in this format:\nQ: [question]\nA: [answer]\nNo explanation. Only output flashcards.\n${text}\nFlashcards:`
  )
}

export async function getAIMCQs(text: string) {
  return callTogetherAI(
    `You are an AI teacher creating a multiple-choice quiz.
Generate 5 multiple-choice questions from the following text.
Format each question like this:
Q1. What is photosynthesis?
A. Process by which plants make food
B. Process of respiration
C. Process of digestion
D. Process of transpiration
Answer: A

Only output questions in this format, no JSON.

Text:
${text}
`
  )
}