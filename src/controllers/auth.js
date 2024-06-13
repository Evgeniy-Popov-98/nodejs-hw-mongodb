import { loginUser, registerUser } from '../servies/auth';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const user = await loginUser(req.body);

  res.json({
    status: 401,
    message: '',
    data: user,
  });
};
