import { GoogleGenAI } from "@google/genai"

/**
 * Initialize Gemini AI client
 * - Uses API key from environment variables
 */
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})

/**
 * Generates AI content for blog writing
 * @param {string} prompt - Blog title or topic
 * @returns {string} Generated blog content
 */
async function main(prompt) {
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
    });

    return response.text
}

export default main