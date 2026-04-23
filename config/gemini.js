/**
 * gemini.js
 * BlemMap Config — Gemini API Configuration
 * Responsibility: Export Gemini API credentials and settings
 * Status: DUMMY — add real credentials in .env
 */

const geminiConfig = {
    apiKey: process.env.GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY',
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
    model: 'gemini-pro',
    maxTokens: 1000,
    temperature: 0.3 // Lower = more consistent, structured outputs
    // TODO: Adjust temperature based on use case
    // validator.js — low temp (0.1-0.3) for consistent validation
    // convergence.js — medium temp (0.3-0.5) for similarity detection
    // scorer.js — low temp (0.1-0.3) for consistent scoring
}

module.exports = { geminiConfig }
