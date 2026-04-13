const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Require các route từ từng feature riêng biệt
const ingredientRoutes = require('./src/features/ingredients/routes');
const recipeRoutes = require('./src/features/recipes/routes');
const cookingRoutes = require('./src/features/cooking/routes');
const errorHandler = require('./src/shared/middlewares/errorHandler');


const app = express();

// Khởi tạo các middleware toàn cục
app.use(cors());
app.use(express.json());

// Gắn (mount) các feature routes
app.use('/api/ingredients', ingredientRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/cooking', cookingRoutes);

// Middleware xử lý lỗi tập trung
app.use(errorHandler);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
