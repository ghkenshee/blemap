/**
 * gemini.js
 * BlemMap AI Layer — Gemini API Caller
 * Responsibility: Send prompts to Gemini API and return raw responses
 * Status: DUMMY — replace with real Gemini API call
 */

const { geminiConfig } = require('../config/gemini')

/**
 * Sends a prompt to Gemini API and returns the response
 * @param {string} prompt - The prompt to send to Gemini
 * @returns {Promise<string>} - Raw AI response as string
 */
async function callGemini(prompt) {
    // TODO: Replace with real Gemini API call
    // const response = await fetch(geminiConfig.endpoint, {
    //     method: 'POST',
    //     headers: { 'Authorization': `Bearer ${geminiConfig.apiKey}` },
    //     body: JSON.stringify({ prompt })
    // })
    // return await response.json()

    console.log('[Gemini] Sending prompt...')

    // DUMMY RESPONSE — remove when real API is integrated
    return JSON.stringify({
        isValid: true,
        reason: "Genuine problem identified",
        structuredSummary: "DUMMY: Structured problem summary goes here",
        category: "Tech",
        inferredPainLevel: 7,
        gapScore: 84,
        cta: "DUMMY: Prospector CTA goes here"
    })
}

module.exports = { callGemini }
