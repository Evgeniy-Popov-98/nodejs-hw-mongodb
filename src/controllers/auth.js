import { REFRESH_TOKEN_LIFE_TIME } from '../constants/constants.js';
import {
  loginUser,
  logoutUser,
  refreshUser,
  registerUser,
  requestResetToken,
  resetPassword,
} from '../servies/auth.js';

const setupSession = (res, session) => {
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + REFRESH_TOKEN_LIFE_TIME),
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + REFRESH_TOKEN_LIFE_TIME),
  });
};

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: { name: user.name, email: user.email },
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { accessToken: session.accessToken },
  });
};

export const refreshUserController = async (req, res) => {
  const session = await refreshUser({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken: session.accessToken },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId)
    await logoutUser({
      sessionId: req.cookies.sessionId,
      refreshToken: req.cookies.refreshToken,
    });

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const requestResetEmailController = async (req, res) => {
  await requestResetToken(req.body.email);

  res.status(200).json({
    status: 200,
    message: 'Reset password email has been successfully sent.',
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);

  if (req.cookies.sessionId)
    await logoutUser({
      sessionId: req.cookies.sessionId,
      refreshToken: req.cookies.refreshToken,
    });

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.json({
    status: 200,
    message: 'Password has been successfully reset.',
    data: {},
  });
};
