const { z } = require('zod');

/**
 * Zod schemas for request validation.
 */

/** GET /ingredients/suggest?q=... */
const ingredientSuggestSchema = z.object({
  q: z
    .string({ required_error: 'Query parameter "q" is required' })
    .min(1, 'Query parameter "q" must not be empty')
    .max(100, 'Query parameter "q" must not exceed 100 characters')
});

/** POST /recipes/suggest */
const recipeSuggestSchema = z.object({
  ingredients: z
    .array(
      z.string().min(1, 'Each ingredient must be a non-empty string'),
      { required_error: '"ingredients" array is required' }
    )
    .min(1, 'At least one ingredient is required')
    .max(20, 'Maximum 20 ingredients allowed')
});

module.exports = { ingredientSuggestSchema, recipeSuggestSchema };
