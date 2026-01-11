/**
 * Centralized Error Handling Middleware
 * Catches all errors from route handlers and sends consistent error responses
 */
const errorHandler = (err, req, res, next) => {
  // Log error for debugging
  console.error('❌ Error:', {
    message: err.message,
    status: err.status || 500,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // Default error response
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(error => error.message);
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      details: messages,
      status: 400
    });
  }

  // Handle Mongoose CastError (Invalid MongoDB ID)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: 'Invalid ID format',
      message: `Invalid ${err.kind}: ${err.value}`,
      status: 400
    });
  }

  // Handle Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      error: 'Duplicate Field',
      message: `${field} already exists`,
      status: 400
    });
  }

  // Generic error response
  res.status(status).json({
    success: false,
    error: message,
    status: status,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;

