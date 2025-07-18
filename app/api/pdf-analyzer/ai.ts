const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY!;

async function callTogetherAI(prompt: string) {
  try {
    const res = await fetch('https://api.together.xyz/v1/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${TOGETHER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'meta-llama/Llama-3-8b-chat-hf',
        prompt,
        max_tokens: 512,
        temperature: 0.2,
        stop: null,
      }),
    });

    const data = await res.json();
    if (!data.choices || !data.choices[0] || !data.choices[0].text) {
      console.error('TogetherAI error:', data);
      return '[AI error: No response]';
    }
    return data.choices[0].text.trim();
  } catch (e) {
    console.error('TogetherAI fetch error:', e);
    return '[AI error: Fetch failed]';
  }
}

export async function getAISummary(text: string) {
  return callTogetherAI(
    `You are an AI study assistant for high school students.

Summarize the following content clearly in 5 bullet points.
Each point should explain a unique concept in simple language.

Text:
${text}

Bullet Summary:
- `
  );
}

export async function getAIQuestions(text: string) {
  return callTogetherAI(
    `You are an AI teacher. Based on the following textbook content, write 8-12 unique study questions.

Avoid simple "What is..." questions. Include "how", "why", and "explain" style questions too.

Only return one question per line, no numbers or explanations.

Text:
${text}

Student Questions:`
  );
}

export async function getAIFlashcards(text: string) {
  return callTogetherAI(
    `You are an AI assistant. Create 8 high-quality flashcards from the following chapter.

Each flashcard format must be:
Q: [question]
A: [short answer]

Avoid repeating phrases. Keep answers helpful but short.

Only return flashcards.

Text:
${text}

Flashcards:`
  );
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
  );
}

export async function getAIAnswer(text: string, question: string) {
  return callTogetherAI(
    `Text:
${text}
Question:
${question}

Answer:`
  );
}