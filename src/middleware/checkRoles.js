import createHttpError from 'http-errors';
import { ROLES } from '../constants/constants.js';
import { Contact } from '../db/models/contact.js';

export const checkRoles =
  (...roles) =>
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      next(createHttpError(401, 'User not found!'));
      return;
    }

    const { role } = user;

    if (roles.includes(ROLES.ADMIN) && role === ROLES.ADMIN) {
      next();
      return;
    }

    if (roles.includes(ROLES.USER) && role === ROLES.USER) {
      const { userId } = req.params;

      if (!userId) {
        next(createHttpError(403, 'User ID not found!'));
        return;
      }

      const user = await Contact.findOne({
        _id: userId,
        userId: user._id,
      });

      if (user) return next();
    }

    next(createHttpError(403, 'Forbidden'));
  };
