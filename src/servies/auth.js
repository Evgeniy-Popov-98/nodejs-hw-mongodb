import { User } from '../db/models/user';

export const registerUser = async (payload) => {
  return await User.create(payload);
};
