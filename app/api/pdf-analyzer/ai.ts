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

// Prompt-engineered helpers:

export async function getAISummary(text: string) {
  return callTogetherAI(
    `Summarize this PDF for a student in 3-5 sentences. 
    Do NOT include any extra explanation or comments. 
    PDF text:\n\n${text}`
  )
}

export async function getAIQuestions(text: string) {
  return callTogetherAI(
    `Extract up to 10 questions (MCQ, short, long) from this PDF text. 
    List ONLY the questions, one per line, with no extra explanation or comments. 
    If there are no questions, just write "No questions found." 
    PDF text:\n\n${text}`
  )
}

export async function getAIKeywords(text: string) {
  return callTogetherAI(
    `List the 10 most important keywords, formulas, and definitions from this PDF text. 
    Separate each keyword with a comma, and do NOT include any extra explanation. 
    PDF text:\n\n${text}`
  )
}

export async function getAISubject(text: string) {
  return callTogetherAI(
    `What is the main school subject of this PDF? 
    Respond with only one word (e.g. Physics, English, History, Chemistry, Math, etc). 
    PDF text:\n\n${text}`
  )
}

export async function getAIAnswer(text: string, question: string) {
  return callTogetherAI(
    `Based on this PDF content:\n${text}\n\nAnswer this question for a student:\n${question}`
  )
}