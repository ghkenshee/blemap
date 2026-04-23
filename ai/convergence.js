/**
 * convergence.js
 * BlemMap AI Layer — Problem Convergence Engine
 * Responsibility: Detect and merge semantically similar problems
 * Status: DUMMY — convergence logic needs implementation
 */

const { callGemini } = require('./gemini')

/**
 * Checks if incoming problem is similar to existing problems
 * @param {string} newProblem - Incoming structured problem summary
 * @param {Array} existingProblems - Array of existing problem summaries from Supabase
 * @returns {Promise<Object>} - Convergence result
 */
async function checkDuplicate(newProblem, existingProblems) {
    // TODO: Optimize — avoid sending entire problem list for large datasets
    const prompt = `
        You are BlemMap's convergence engine.
        
        New problem: "${newProblem}"
        
        Existing problems: ${JSON.stringify(existingProblems)}
        
        Determine if the new problem is semantically similar to any existing problem.
        
        Respond in JSON only:
        {
            "isDuplicate": true or false,
            "matchedProblemId": "id of matched problem or null",
            "similarityScore": 0-100,
            "reason": "why this is or isn't a duplicate"
        }
    `

    try {
        const response = await callGemini(prompt)
        return JSON.parse(response)
    } catch (error) {
        console.error('[Convergence] Duplicate check failed:', error)
        return {
            isDuplicate: false,
            matchedProblemId: null,
            similarityScore: 0,
            reason: "Convergence service unavailable"
        }
    }
}

/**
 * Merges similar problems into one weighted entry
 * @param {string} problemId - ID of existing problem to merge into
 * @param {string} newRawInput - New raw submission to absorb
 * @returns {Promise<Object>} - Updated problem entry
 */
async function convergeProblems(problemId, newRawInput) {
    // TODO: Implement merge logic
    // - Increment pain score
    // - Update structured summary if needed
    // - Recalculate gap score
    console.log(`[Convergence] Merging submission into problem ${problemId}`)
    return { problemId, merged: true }
}

module.exports = { checkDuplicate, convergeProblems }
