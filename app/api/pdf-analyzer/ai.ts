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
    `Summarize the following text for a high school student in 3-5 simple sentences:\n\n${text}\n\nSummary:`
  )
}

export async function getAIQuestions(text: string) {
  return callTogetherAI(
    `From the following text, extract up to 10 actual questions (MCQ, short, or long answer). Only list the questions, one per line. Do not include any explanation, code, or instructions. If there are no questions, just write "No questions found."\n\n${text}\n\nQuestions:`
  )
}

export async function getAIKeywords(text: string) {
  return callTogetherAI(
    `List the 10 most important keywords, formulas, or definitions from the following text. Separate each keyword with a comma. Do not include any explanation or extra text.\n\n${text}\n\nKeywords:`
  )
}

export async function getAISubject(text: string) {
  return callTogetherAI(
    `What is the main school subject of this text? Respond with only one word (e.g. Physics, English, History, Chemistry, Math, etc).\n\n${text}\n\nSubject:`
  )
}