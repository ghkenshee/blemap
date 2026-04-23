/**
 * reddit.js
 * BlemMap Scraper Layer — Reddit API Client
 * Responsibility: Fetch posts and comments from Reddit via Snoowrap
 * Status: DUMMY — Snoowrap credentials needed
 */

const { redditConfig } = require('../config/reddit')

// TODO: Uncomment when Snoowrap is installed
// const snoowrap = require('snoowrap')
// const r = new snoowrap(redditConfig)

// Target subreddits for problem harvesting
const TARGET_SUBREDDITS = [
    'mildlyinfuriating',
    'legaladvice',
    'AskDocs',
    'appideas',
    'productivity',
    'techsupport',
    'finance'
]

/**
 * Fetches new posts from target subreddits
 * @param {number} limit - Number of posts to fetch per subreddit
 * @returns {Promise<Array>} - Array of raw Reddit posts
 */
async function fetchPosts(limit = 25) {
    // TODO: Replace with real Snoowrap call
    // const posts = await Promise.all(
    //     TARGET_SUBREDDITS.map(sub =>
    //         r.getSubreddit(sub).getNew({ limit })
    //     )
    // )
    // return posts.flat()

    console.log('[Reddit] Fetching posts from target subreddits...')

    // DUMMY DATA — remove when Snoowrap is integrated
    return [
        {
            id: 'dummy_001',
            title: "Why is there no app that splits bills by percentage",
            body: "I've tried Splitwise but it only does equal splits",
            subreddit: 'mildlyinfuriating',
            score: 847,
            comments: []
        },
        {
            id: 'dummy_002',
            title: "Can't find a good lawyer for small claims in Philippines",
            body: "Every lawyer wants a retainer fee I can't afford",
            subreddit: 'legaladvice',
            score: 234,
            comments: []
        }
    ]
}

/**
 * Fetches comments for a specific post
 * @param {string} postId - Reddit post ID
 * @returns {Promise<Array>} - Array of comments
 */
async function fetchComments(postId) {
    // TODO: Replace with real Snoowrap call
    // const submission = await r.getSubmission(postId).expandReplies({ limit: 10 })
    // return submission.comments

    console.log(`[Reddit] Fetching comments for post ${postId}...`)

    // DUMMY DATA — remove when Snoowrap is integrated
    return [
        { body: "Try Tricount — it handles custom percentages", score: 47 },
        { body: "We just use a shared Google Sheet", score: 23 },
        { body: "Someone needs to build a proper app for this", score: 12 }
    ]
}

module.exports = { fetchPosts, fetchComments, TARGET_SUBREDDITS }
