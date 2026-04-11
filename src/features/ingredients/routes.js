const express = require('express');
const router = express.Router();

// Route: Lấy danh sách nguyên liệu
router.get('/', async (req, res, next) => {
  try {
    // Logic sẽ được gọi từ ingredients/services.js
    res.status(200).json({ message: 'Danh sách nguyên liệu' });
  } catch (error) {
    next(error);
  }
});

// Route: API Test cho hệ thống
router.get('/test', async (req, res, next) => {
  try {
    res.status(200).json({ 
      status: 'success', 
      message: 'Base Backend đã sẵn sàng!' 
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

