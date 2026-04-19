import express from 'express';
import { GetRecipesController } from '../controllers/recipe.controller';

const router = express.Router();

// Lấy danh sách công thức
router.get('/', GetRecipesController);

export default router;
