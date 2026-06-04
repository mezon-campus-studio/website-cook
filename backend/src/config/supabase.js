const { createClient } = require('@supabase/supabase-js');
const { env } = require('./env');

/**
 * Supabase client singleton.
 * Uses the service-role key for server-side operations
 * so Row-Level-Security is bypassed (backend is trusted).
 *
 * Lazily initialized on first access to allow the server
 * to start even when credentials are not yet configured.
 */
let _supabase = null;

function getSupabase() {
  if (_supabase) return _supabase;

  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_KEY) {
    throw new Error(
      'Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_KEY in .env'
    );
  }

  _supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY, {
    auth: { persistSession: false }
  });

  return _supabase;
}

/**
 * Proxy that lazily initializes the Supabase client.
 * Existing code can keep using `supabase.from(...)` unchanged.
 */
const supabase = new Proxy(
  {},
  {
    get(_target, prop) {
      const client = getSupabase();
      const value = client[prop];
      return typeof value === 'function' ? value.bind(client) : value;
    }
  }
);

module.exports = { supabase };
