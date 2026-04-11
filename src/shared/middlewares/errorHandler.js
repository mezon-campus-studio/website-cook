/**
 * Middleware xử lý lỗi tập trung cho toàn ứng dụng
 * @param {Error} err - Đối tượng lỗi
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 */
const errorHandler = (err, req, res, next) => {
  // Ghi log lỗi ra console để team dễ theo dõi khi debug
  console.error(`[ERROR] ${new Date().toISOString()}:`, err.stack);

  // Lấy status code từ error object hoặc mặc định là 500 (Internal Server Error)
  const statusCode = err.statusCode || 500;
  
  // Trả về JSON lỗi đồng nhất cho phía Frontend
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Đã xảy ra lỗi máy chủ không mong muốn.',
    // Chỉ hiển thị chi tiết stack trace nếu đang ở môi trường phát triển
    stack: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
};

module.exports = errorHandler;
