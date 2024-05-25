export const notFoudMiddleware = (req, res) => {
  res.status(404).json({
    message: 'Not found',
  });
};
