import { z } from 'zod';

export const createIngredientSchema = z.object({
  body: z.object({
    name: z.string({
      message: 'Name is required',
    }),
    calories: z.number({
      message: 'Calories are required',
    }).positive('Calories must be a positive number'),
    category: z.string().optional()
  })
});

export type CreateIngredientDTO = z.infer<typeof createIngredientSchema>;
