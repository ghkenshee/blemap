/**
 * supabase.js
 * BlemMap Config — Supabase Client
 * Responsibility: Initialize and export Supabase client
 * Status: DUMMY — add real credentials in .env
 */

// TODO: Uncomment when Supabase is installed
// const { createClient } = require('@supabase/supabase-js')

const SUPABASE_URL = process.env.SUPABASE_URL || 'YOUR_SUPABASE_URL'
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

// TODO: Replace dummy client with real Supabase client
// const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// DUMMY CLIENT — remove when Supabase is configured
const supabase = {
    from: (table) => ({
        select: async () => ({ data: [], error: null }),
        insert: async (data) => { console.log(`[Supabase DUMMY] Inserting into ${table}:`, data); return { data, error: null } },
        update: async (data) => { console.log(`[Supabase DUMMY] Updating ${table}:`, data); return { data, error: null } },
        delete: async () => ({ data: null, error: null })
    })
}

module.exports = { supabase, SUPABASE_URL }
