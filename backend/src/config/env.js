const path = require('path');
const dotenv = require('dotenv');
const { z } = require('zod');

// Load .env from the backend root (one level above src/)
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const schema = z.object({
  NODE_ENV: z.string().default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  SUPABASE_URL: z.string().default(''),
  SUPABASE_SERVICE_KEY: z.string().default(''),
  GEMINI_API_KEY: z.string().default(''),
  GEMINI_MODEL: z.string().default('gemini-2.0-flash'),
  SPOONACULAR_API_KEY: z.string().default(''),
  SPOONACULAR_BASE_URL: z.string().url().default('https://api.spoonacular.com'),
  SPOONACULAR_TIMEOUT: z.coerce.number().int().positive().default(10000)
});

const raw = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  GEMINI_MODEL: process.env.GEMINI_MODEL,
  SPOONACULAR_API_KEY: process.env.SPOONACULAR_API_KEY,
  SPOONACULAR_BASE_URL: process.env.SPOONACULAR_BASE_URL,
  SPOONACULAR_TIMEOUT: process.env.SPOONACULAR_TIMEOUT
};

const env = schema.parse(raw);

module.exports = { env };
