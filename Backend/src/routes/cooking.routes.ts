import express from 'express';
import { GetCookingProgressController } from '../controllers/cooking.controller';

const router = express.Router();

// Lấy tiến trình nấu ăn
router.get('/', GetCookingProgressController);

export default router;
