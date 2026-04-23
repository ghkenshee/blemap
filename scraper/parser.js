/**
 * parser.js
 * BlemMap Scraper Layer — Reddit Post Parser
 * Responsibility: Extract problems and solutions from raw Reddit data
 * Status: DUMMY — parsing logic needs refinement
 */

// Minimum comment score to be considered a valid solution
const MIN_SOLUTION_SCORE = 10

/**
 * Parses a raw Reddit post into BlemMap problem format
 * @param {Object} post - Raw Reddit post object
 * @returns {Object} - Parsed problem object ready for AI validation
 */
function parsePost(post) {
    // TODO: Add more sophisticated problem extraction logic
    return {
        rawInput: `${post.title}. ${post.body}`.trim(),
        source: 'reddit',
        sourceId: post.id,
        subreddit: post.subreddit,
        upvotes: post.score,
        scrapedAt: new Date().toISOString()
    }
}

/**
 * Parses Reddit comments into BlemMap solution candidates
 * @param {Array} comments - Raw Reddit comments array
 * @returns {Array} - Filtered and parsed solution candidates
 */
function parseComments(comments) {
    // TODO: Improve filtering — remove jokes, off-topic replies, short comments
    return comments
        .filter(comment => comment.score >= MIN_SOLUTION_SCORE)
        .filter(comment => comment.body.length > 20)
        .map(comment => ({
            rawSolution: comment.body,
            upvotes: comment.score,
            source: 'reddit',
            scrapedAt: new Date().toISOString()
        }))
}

/**
 * Detects domain sensitivity of a post
 * @param {string} subreddit - Source subreddit name
 * @returns {string} - Sensitivity level: 'high' or 'normal'
 */
function detectSensitivity(subreddit) {
    // TODO: Expand sensitive domain list
    const sensitiveDomains = ['legaladvice', 'AskDocs', 'medicine', 'law']
    return sensitiveDomains.includes(subreddit) ? 'high' : 'normal'
}

module.exports = { parsePost, parseComments, detectSensitivity }
