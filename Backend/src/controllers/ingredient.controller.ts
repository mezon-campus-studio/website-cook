import { Request, Response } from 'express';
import { IngredientService } from '../services/ingredient.service';
import { asyncHandler } from '../shared/utils/asyncHandler';

export const GetAllIngredientsController = asyncHandler(async (req: Request, res: Response) => {
  const data = await IngredientService.getAllIngredients();
  
  res.status(200).json({
    status: 'success',
    data
  });
});

export const GetIngredientByIdController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await IngredientService.getIngredientById(id as string);
  
  res.status(200).json({
    status: 'success',
    data
  });
});

export const TestIngredientController = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ 
    status: 'success', 
    message: 'Base Backend đã sẵn sàng!' 
  });
});

export const CreateIngredientController = asyncHandler(async (req: Request, res: Response) => {
  const newIngredient = req.body;
  res.status(201).json({
    status: 'success',
    data: newIngredient
  });
});
