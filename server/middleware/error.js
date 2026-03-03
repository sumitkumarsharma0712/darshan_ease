export function errorHandler(err, req, res, _next) {
  const status = err.status || 500;
  const message = err.message || "Server Error";

  if (status === 500) {
    console.error(`[ERROR] ${req.method} ${req.originalUrl}:`, err);
  }

  res.status(status).json({
    message,
    ...(process.env.NODE_ENV === "development" && status === 500 && { stack: err.stack })
  });
}
