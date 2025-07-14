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

export async function getAISummary(text: string) {
  return callTogetherAI(
    `Summarize the following text for a high school student in 3-5 simple sentences.
Do NOT include any explanation, code, or extra text.
Text:
${text}
Summary:`
  )
}

export async function getAIQuestions(text: string) {
  return callTogetherAI(
    `From the following text, extract up to 10 actual questions (MCQ, short, or long answer).
Only list the questions, one per line, and do NOT include any explanation, code, or instructions.
If there are no questions, just write "No questions found."
Text:
${text}
Questions:`
  )
}

export async function getAIFlashcards(text: string) {
  return callTogetherAI(
    `From the following text, generate up to 10 flashcards.
Each flashcard should be a Q&A pair in this format:
Q: [question]
A: [answer]
Do NOT include any explanation or extra text.
Text:
${text}
Flashcards:`
  )
}
export async function getAIAnswer(text: string, question: string) {
  return callTogetherAI(
    `Based on this PDF content:
${text}

Answer this question for a student:
${question}`
  )
}