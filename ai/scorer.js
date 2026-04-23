/**
 * scorer.js
 * BlemMap AI Layer — Gap Scorer
 * Responsibility: Calculate gap score and pain score for problems
 * Status: DUMMY — scoring formula needs refinement
 */

const { callGemini } = require('./gemini')

/**
 * Calculates gap score based on problem and existing solutions
 * @param {string} problemSummary - Structured problem summary
 * @param {Array} existingSolutions - Known existing solutions
 * @returns {Promise<number>} - Gap score 0-100
 */
async function calculateGapScore(problemSummary, existingSolutions) {
    // TODO: Refine scoring prompt for accuracy
    const prompt = `
        You are BlemMap's gap scoring engine.
        
        Problem: "${problemSummary}"
        Existing solutions: ${JSON.stringify(existingSolutions)}
        
        Analyze how well existing solutions address this problem.
        A score of 100 means no solution exists at all.
        A score of 0 means the problem is fully solved.
        
        Respond in JSON only:
        {
            "gapScore": 0-100,
            "reasoning": "why this score was assigned",
            "shortcomings": ["list of shortcomings in existing solutions"]
        }
    `

    try {
        const response = await callGemini(prompt)
        const parsed = JSON.parse(response)
        return parsed
    } catch (error) {
        console.error('[Scorer] Gap score calculation failed:', error)
        return { gapScore: 0, reasoning: "Scoring unavailable", shortcomings: [] }
    }
}

/**
 * Calculates pain score based on confirmation count
 * @param {number} confirmations - Number of user confirmations
 * @param {number} inferredPainLevel - AI inferred pain level 1-10
 * @returns {number} - Weighted pain score
 */
function calculatePainScore(confirmations, inferredPainLevel) {
    // TODO: Refine pain score formula
    // Current formula: confirmations weighted by inferred pain level
    return confirmations * inferredPainLevel
}

/**
 * Determines matrix position based on gap score and pain score
 * @param {number} gapScore - 0-100
 * @param {number} painScore - weighted pain score
 * @returns {Object} - Matrix quadrant and coordinates
 */
function determineMatrixPosition(gapScore, painScore) {
    // TODO: Map scores to exact matrix coordinates
    const quadrant =
        painScore >= 50 && gapScore >= 50 ? 'URGENT_GAP' :
        painScore >= 50 && gapScore < 50  ? 'PAINFUL_BUT_SOLVED' :
        painScore < 50  && gapScore >= 50 ? 'HIDDEN_GEM' :
                                            'SATURATED'

    return { quadrant, x: gapScore, y: painScore }
}

module.exports = { calculateGapScore, calculatePainScore, determineMatrixPosition }
