export const registerUserController = (req, res, next) => {
  res.json({
    status: 201,
    message: 'Successfully registered a user!',
    data: [],
  });
};
