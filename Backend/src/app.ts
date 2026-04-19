import 'dotenv/config';
import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';

// Require controllers using new MVC
import ingredientRoutes from './routes/ingredient.routes';
import cookingRoutes from './routes/cooking.routes';
import recipeRoutes from './routes/recipe.routes';

import errorHandler from './middlewares/errorHandler';

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Gắn (mount) các routes
app.use('/api/ingredients', ingredientRoutes);
app.use('/api/cooking', cookingRoutes);
app.use('/api/recipes', recipeRoutes);

// Middleware xử lý lỗi tập trung
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
