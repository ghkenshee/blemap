const snoowrap = require('snoowrap')

// Load from environment variables
const reddit = new snoowrap({
  userAgent: process.env.REDDIT_USER_AGENT, // e.g. 'blemap-app'
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  username: process.env.REDDIT_USERNAME,
  password: process.env.REDDIT_PASSWORD
})

// Optional: reduce API errors
reddit.config({
  requestDelay: 1000,
  continueAfterRatelimitError: true
})

/**
 * Fetch posts from a subreddit
 */
const getSubredditPosts = async (subredditName, limit = 10) => {
  try {
    const posts = await reddit
      .getSubreddit(subredditName)
      .getHot({ limit })

    return posts.map(post => ({
      id: post.id,
      title: post.title,
      text: post.selftext,
      url: post.url,
      score: post.score,
      comments: post.num_comments,
      createdAt: post.created_utc
    }))
  } catch (error) {
    console.error('Reddit fetch error:', error.message)
    throw error
  }
}

/**
 * Search Reddit for problems (keywords)
 */
const searchReddit = async (query, limit = 10) => {
  try {
    const results = await reddit.search({
      query,
      sort: 'relevance',
      time: 'all',
      limit
    })

    return results.map(post => ({
      id: post.id,
      title: post.title,
      text: post.selftext,
      url: post.url,
      score: post.score,
      subreddit: post.subreddit.display_name
    }))
  } catch (error) {
    console.error('Reddit search error:', error.message)
    throw error
  }
}

module.exports = {
  reddit,
  getSubredditPosts,
  searchReddit
}
