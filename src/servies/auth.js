import createHttpError from 'http-errors';
import { User } from '../db/models/user.js';
import bcrypt from 'bcrypt';
import { Session } from '../db/models/session.js';
import {
  ACCESS_TOKEN_LIFE_TIME,
  REFRESH_TOKEN_LIFE_TIME,
} from '../constants/constants.js';
import { randomBytes } from 'crypto';

const createSession = () => {
  return {
    accessToken: randomBytes(30).toString('base64'),
    refreshToken: randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_LIFE_TIME),
    refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_LIFE_TIME),
  };
};

export const registerUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });

  if (user) throw createHttpError(409, 'Email in use');

  await bcrypt.hash(payload.password, 10);

  return await User.create({ ...payload });
};

export const loginUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) throw createHttpError(401, 'User not found');

  const isEqual = await bcrypt.compare(payload.password, user.password);

  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  await Session.deleteOne({ userId: user._id });

  return await Session.create({
    userId: user._id,
    ...createSession(),
  });
};

export const refreshUser = async ({ sessionId, refreshToken }) => {
  const session = await Session.findOne({ id: sessionId, refreshToken });

  if (!session) throw createHttpError(401, 'Session not found');

  const isTokenExpired = new Date() > new Date(session.refreshTokenValidUntil);
  if (isTokenExpired) throw createHttpError(401, 'Refresh token is expired!');

  await Session.deleteOne({ _id: sessionId });

  return await Session.create({
    userId: session.userId,
    ...createSession(),
  });
};

export const logoutUser = async ({ sessionId, sessionToken }) => {
  return await Session.deleteOne({
    _id: sessionId,
    refreshToken: sessionToken,
  });
};
