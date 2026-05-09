const { z } = require('zod');

const schema = z.object({
  NODE_ENV: z.string().default('development'),
  PORT: z.coerce.number().int().positive().default(3000)
});

const raw = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT
};

const env = schema.parse(raw);

module.exports = { env };

