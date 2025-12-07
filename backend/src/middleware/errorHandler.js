const notFound = (req, res, next) => {
  res.status(404).json({ message: "Route Not Found" });
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Server Error",
    stack: err.stack,
  });
};

export { notFound, errorHandler };
