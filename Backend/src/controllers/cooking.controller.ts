import { Request, Response } from 'express';
import { CookingService } from '../services/cooking.service';
import { asyncHandler } from '../shared/utils/asyncHandler';

export const GetCookingProgressController = asyncHandler(async (req: Request, res: Response) => {
  const data = await CookingService.getCookingProgress();
  res.status(200).json(data);
});
