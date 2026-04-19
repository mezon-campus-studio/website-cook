import express from 'express';
import {
  GetAllIngredientsController, 
  GetIngredientByIdController,
  TestIngredientController,
  CreateIngredientController
} from '../controllers/ingredient.controller';
import { validateMiddleware } from '../middlewares/validate.middleware';
import { createIngredientSchema } from '../validations/ingredient.validation';

const router = express.Router();

// Lấy danh sách nguyên liệu
router.get('/', GetAllIngredientsController);

// Tạo mới nguyên liệu
router.post('/', validateMiddleware(createIngredientSchema), CreateIngredientController);

// Route Test
router.get('/test', TestIngredientController);

// Lấy chi tiết nguyên liệu theo ID
router.get('/:id', GetIngredientByIdController);

export default router;
