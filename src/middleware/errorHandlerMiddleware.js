export const errorHandlerMiddleware = (error, req, res, next) => {
  res.status(500).json({
    message: 'Something went wrong',
    error: error.message,
  });
};
