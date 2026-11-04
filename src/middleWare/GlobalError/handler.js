
export const handler = (err, req, res, next) => {
  console.error("ERROR:", err);

  const status = err.cause?.status || err.statusCode || err.status || 500;

  res.status(status).json({
    error: status === 500 ? "Internal server error" : err.message,
  });
};