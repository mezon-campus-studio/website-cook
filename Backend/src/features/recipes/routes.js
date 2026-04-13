const express = require('express');
const router = express.Router();

// Route: Lấy danh sách công thức
router.get('/', async (req, res, next) => {
  try {
    // Logic sẽ được gọi từ recipes/services.js
    res.status(200).json({ message: 'Danh sách công thức món ăn' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
