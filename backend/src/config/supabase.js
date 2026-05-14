const { createClient } = require('@supabase/supabase-js');
const { env } = require('./env');

/**
 * Supabase client singleton.
 * Uses the service-role key for server-side operations
 * so Row-Level-Security is bypassed (backend is trusted).
 */
const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY, {
  auth: { persistSession: false }
});

module.exports = { supabase };
