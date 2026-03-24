const mongoose = require('mongoose');

// ==========================================
// CUSTOM ERROR CLASS
// ==========================================
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// ==========================================
// NOT FOUND HANDLER (404)
// ==========================================
const notFound = (req, res, next) => {
  const error = new AppError(`Route not found: ${req.originalUrl}`, 404);
  next(error);
};

// ==========================================
// GLOBAL ERROR HANDLER
// ==========================================
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  error.statusCode = err.statusCode || 500;

  // ==========================================
  // SIMPLE CONSOLE LOG (Development Only)
  // ==========================================
  if (process.env.NODE_ENV === 'development') {
    console.error('\n❌ ERROR:');
    console.error('Message:', err.message);
    console.error('Status:', error.statusCode);
    console.error('Path:', req.originalUrl);
    console.error('Method:', req.method);
    if (err.statusCode >= 500) {
      console.error('Stack:', err.stack);
    }
    console.error('---\n');
  }

  // ==========================================
  // 1. Mongoose Validation Error
  // ==========================================
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map(error => error.message)
      .join(', ');

    error.message = message;
    error.statusCode = 400;
  }

  // ==========================================
  // 2. Mongoose Duplicate Key Error (11000)
  // ==========================================
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    const value = err.keyValue[field];

    error.message = `${field.charAt(0).toUpperCase() + field.slice(1)} '${value}' already exists`;
    error.statusCode = 409;
  }

  // ==========================================
  // 3. Mongoose Cast Error (Invalid ObjectId)
  // ==========================================
  if (err.name === 'CastError') {
    error.message = `Invalid ${err.path}: ${err.value}`;
    error.statusCode = 400;
  }

  // ==========================================
  // 4. JWT Errors
  // ==========================================
  if (err.name === 'JsonWebTokenError') {
    error.message = 'Invalid token. Please login again.';
    error.statusCode = 401;
  }

  if (err.name === 'TokenExpiredError') {
    error.message = 'Session expired. Please login again.';
    error.statusCode = 401;
  }

  // ==========================================
  // 5. Multer File Upload Errors
  // ==========================================
  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      error.message = 'File size too large. Maximum size is 5MB.';
    } else if (err.code === 'LIMIT_FILE_COUNT') {
      error.message = 'Too many files uploaded.';
    } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      error.message = 'Unexpected file field.';
    } else {
      error.message = `File upload error: ${err.message}`;
    }
    error.statusCode = 400;
  }

  // ==========================================
  // 6. MongoDB Connection Errors
  // ==========================================
  if (err.name === 'MongoServerError') {
    error.message = 'Database operation failed. Please try again.';
    error.statusCode = 500;
  }

  // ==========================================
  // 7. Specific Business Logic Errors
  // ==========================================
  if (err.message.includes('already approved') ||
    err.message.includes('already rejected') ||
    err.message.includes('already published')) {
    error.statusCode = 400;
  }

  if (err.message.includes('Unauthorized') ||
    err.message.includes('do not own') ||
    err.message.includes('only update your assigned')) {
    error.statusCode = 403;
  }

  if (err.message.includes('banned') ||
    err.message.includes('pending admin approval')) {
    error.statusCode = 403;
  }

  // ==========================================
  // SEND ERROR RESPONSE
  // ==========================================
  const response = {
    success: false,
    message: error.message || 'Internal server error'
  };

  // Include details only in development
  if (process.env.NODE_ENV === 'development') {
    response.path = req.originalUrl;
    response.method = req.method;
  }

  res.status(error.statusCode).json(response);
};

// ==========================================
// ASYNC HANDLER WRAPPER
// ==========================================
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = {
  AppError,
  notFound,
  errorHandler,
  asyncHandler
};
