import Joi from 'joi';

export const requestResetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});
