/**
 * scheduler.js
 * BlemMap Scraper Layer — Scrape Scheduler
 * Responsibility: Orchestrate the full scraping pipeline on a schedule
 * Status: DUMMY — pipeline needs real implementations connected
 */

const { fetchPosts, fetchComments } = require('./reddit')
const { parsePost, parseComments, detectSensitivity } = require('./parser')
const { validateProblem } = require('../ai/validator')
const { checkDuplicate, convergeProblems } = require('../ai/convergence')
const { calculateGapScore, determineMatrixPosition } = require('../ai/scorer')
const { supabase } = require('../config/supabase')

/**
 * Main scraping pipeline — runs on schedule via Vercel Cron Jobs
 * Triggered by: GET /api/cron/scrape
 */
async function runScrapingPipeline() {
    console.log('[Scheduler] Starting scraping pipeline...')

    try {
        // Step 1: Fetch raw posts from Reddit
        const rawPosts = await fetchPosts(25)
        console.log(`[Scheduler] Fetched ${rawPosts.length} posts`)

        for (const rawPost of rawPosts) {

            // Step 2: Parse raw post into problem format
            const parsed = parsePost(rawPost)
            const sensitivity = detectSensitivity(rawPost.subreddit)

            // Step 3: Validate via AI
            const validation = await validateProblem(parsed.rawInput)
            if (!validation.isValid) {
                console.log(`[Scheduler] Rejected: ${parsed.rawInput.slice(0, 50)}...`)
                continue
            }

            // Step 4: Check for duplicates
            // TODO: Fetch existing problems from Supabase for comparison
            const existingProblems = [] // placeholder
            const duplicate = await checkDuplicate(validation.structuredSummary, existingProblems)

            if (duplicate.isDuplicate) {
                // Merge into existing problem
                await convergeProblems(duplicate.matchedProblemId, parsed.rawInput)
                continue
            }

            // Step 5: Calculate gap score
            const scoring = await calculateGapScore(validation.structuredSummary, [])
            const matrixPosition = determineMatrixPosition(scoring.gapScore, validation.inferredPainLevel * 10)

            // Step 6: Fetch and parse comments as solutions
            const rawComments = await fetchComments(rawPost.id)
            const solutions = parseComments(rawComments)

            // Step 7: Store in Supabase
            // TODO: Uncomment when Supabase is configured
            // await supabase.from('problems').insert({
            //     raw_input: parsed.rawInput,
            //     summary: validation.structuredSummary,
            //     category: validation.category,
            //     pain_level: validation.inferredPainLevel,
            //     gap_score: scoring.gapScore,
            //     cta: validation.cta,
            //     matrix_quadrant: matrixPosition.quadrant,
            //     sensitivity: sensitivity,
            //     source: 'reddit',
            //     source_id: rawPost.id,
            //     status: 'pending'
            // })

            console.log(`[Scheduler] Stored: ${validation.structuredSummary.slice(0, 50)}...`)
        }

        console.log('[Scheduler] Pipeline complete.')

    } catch (error) {
        // TODO: Add proper error reporting — notify admin on failure
        console.error('[Scheduler] Pipeline failed:', error)
    }
}

module.exports = { runScrapingPipeline }
