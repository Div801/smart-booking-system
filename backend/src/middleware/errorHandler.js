const notFound = (req, res, next) => {
  res.status(404).json({ message: 'Route Not Found' });
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
  });
};

module.exports = { notFound, errorHandler };
