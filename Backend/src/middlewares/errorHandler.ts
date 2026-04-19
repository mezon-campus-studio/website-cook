import { Request, Response, NextFunction } from 'express';
import { BaseError } from '../httpErrors';

/**
 * Middleware xử lý lỗi tập trung cho toàn ứng dụng
 * @param {Error} err - Đối tượng lỗi
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 */
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // Ghi log lỗi ra console để team dễ theo dõi khi debug
  console.error(`[ERROR] ${new Date().toISOString()}:`, err.stack);

  if (err instanceof BaseError) {
    if (!err.isOperational) {
      // Lỗi do hệ thống hoặc lỗi không mong đợi
      console.error('Lỗi hệ thống nghiêm trọng (Non-Operational Error):', err);
    }
  
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      errors: 'errors' in err ? (err as any).errors : undefined,
      // Chỉ hiển thị chi tiết stack trace nếu đang ở môi trường phát triển
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  } else {
    // Xử lý các lỗi không phải từ BaseError (Ví dụ: cú pháp, thư viện lỗi,...)
    res.status(500).json({
      status: 'error',
      message: 'Đã xảy ra lỗi máy chủ không mong muốn.',
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};

export default errorHandler;
