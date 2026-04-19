import { Request, Response } from 'express';
import { RecipeService } from '../services/recipe.service';
import { asyncHandler } from '../shared/utils/asyncHandler';

export const GetRecipesController = asyncHandler(async (req: Request, res: Response) => {
  const data = await RecipeService.getRecipes();
  res.status(200).json(data);
});
