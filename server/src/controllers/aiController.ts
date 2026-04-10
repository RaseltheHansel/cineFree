import { GoogleGenerativeAI } from '@google/generative-ai';
 
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
 
export const getAIRecommendations = async (browsedTitles: string[]) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
 
  const prompt = `
    A user has been browsing these movies/series: ${browsedTitles.join(', ')}.
    Suggest 5 other titles they would enjoy.
    Return ONLY a JSON array, no markdown, no explanation:
    [{"title": "...", "reason": "...", "year": "...", "type": "movie|series"}]
  `;
 
  const result = await model.generateContent(prompt);
  const text   = result.response.text();
 
  // Strip any accidental markdown code fences
  return JSON.parse(text.replace(/```json|```/g, '').trim());
};
