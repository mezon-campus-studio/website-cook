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

/** GET /ingredients/search */
const ingredientSearchSchema = z.object({
  query: z
    .string({ required_error: 'Query parameter "query" is required' })
    .min(1, 'Query parameter "query" must not be empty')
    .max(100, 'Query parameter "query" must not exceed 100 characters'),
  addChildren: z
    .preprocess((val) => val === 'true' || val === true, z.boolean())
    .optional(),
  intolerances: z.string().max(200).optional(),
  sort: z.string().max(50).optional(),
  sortDirection: z.enum(['asc', 'desc']).optional(),
  number: z.coerce
    .number()
    .int()
    .positive('Number of results must be greater than 0')
    .max(100, 'Number of results cannot exceed 100')
    .default(10)
    .optional(),
  offset: z.coerce
    .number()
    .int()
    .nonnegative('Offset must be non-negative')
    .default(0)
    .optional()
});

/** GET /recipes/by-ingredients */
const recipeByIngredientsSchema = z.object({
  ingredients: z
    .string({ required_error: 'Query parameter "ingredients" is required' })
    .min(1, 'Query parameter "ingredients" must not be empty')
    .max(500, 'Query parameter "ingredients" must not exceed 500 characters'),
  number: z.coerce
    .number()
    .int()
    .positive('Number of results must be greater than 0')
    .max(100, 'Number of results cannot exceed 100')
    .default(10)
    .optional(),
  ranking: z.coerce
    .number()
    .int()
    .min(1, 'Ranking must be either 1 or 2')
    .max(2, 'Ranking must be either 1 or 2')
    .default(1)
    .optional(),
  ignorePantry: z
    .preprocess((val) => val === 'true' || val === true, z.boolean())
    .default(true)
    .optional()
});

module.exports = {
  ingredientSuggestSchema,
  recipeSuggestSchema,
  ingredientSearchSchema,
  recipeByIngredientsSchema
};
