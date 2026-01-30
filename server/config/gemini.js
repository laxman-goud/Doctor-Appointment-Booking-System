import { GoogleGenAI } from "@google/genai"

/**
 * Initialize Gemini AI client
 * - Uses API key from environment variables
 */
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})

/**
 * Generates AI content for doctor bio
 * @param {string} prompt - Doctor bio prompt
 * @returns {string} Generated doctor bio
 */
async function main(prompt) {
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
    });

    return response.text
}

export default main