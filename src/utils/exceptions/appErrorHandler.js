export default (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Oh No, Something Went Wrong!';
  res.status(status).json({
    success: false,
    status: status,
    message: message,
  });

  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }

  next();
};
