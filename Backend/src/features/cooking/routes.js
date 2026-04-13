const express = require('express');
const router = express.Router();

// Route: Lấy tiến trình nấu ăn
router.get('/', async (req, res, next) => {
  try {
    // Logic sẽ được gọi từ cooking/services.js
    res.status(200).json({ message: 'Tiến trình nấu ăn' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
