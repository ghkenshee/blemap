/**
 * validator.js
 * BlemMap AI Layer — Problem Validator
 * Responsibility: Validate whether a raw user submission is a genuine problem
 * Status: DUMMY — AI prompt needs refinement
 */

const { callGemini } = require('./gemini')

/**
 * Validates a raw user submission
 * @param {string} rawInput - The user's freeform problem submission
 * @returns {Promise<Object>} - Validation result with structured output
 */
async function validateProblem(rawInput) {
    // TODO: Refine this prompt for better validation accuracy
    const prompt = `
        You are BlemMap's problem validation engine.
        
        A user submitted this raw complaint:
        "${rawInput}"
        
        Determine if this is a genuine, specific, solvable problem.
        
        Respond in JSON only — no preamble, no markdown:
        {
            "isValid": true or false,
            "reason": "why this is valid or not",
            "structuredSummary": "clean one sentence problem statement",
            "category": "Tech / Law / Medicine / Finance / Other",
            "inferredPainLevel": 1-10,
            "gapScore": 0-100,
            "cta": "what a prospector could build or do to solve this"
        }
    `

    try {
        const response = await callGemini(prompt)
        const parsed = JSON.parse(response)
        return parsed
    } catch (error) {
        // TODO: Handle AI failure gracefully
        console.error('[Validator] AI validation failed:', error)
        return {
            isValid: false,
            reason: "Validation service unavailable — please try again",
            crashed: false
        }
    }
}

/**
 * Handles AI rejection — returns user-friendly message
 * @param {string} reason - AI rejection reason
 * @returns {string} - Gentle rejection message for user
 */
function buildRejectionMessage(reason) {
    // TODO: Improve rejection messaging based on reason type
    return `We couldn't identify a specific problem from your submission. Could you tell us more about what specifically frustrated you?`
}

module.exports = { validateProblem, buildRejectionMessage }
