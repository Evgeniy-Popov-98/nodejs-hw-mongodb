import Joi from 'joi';

export const GoogleOAuthSchema = Joi.object({
  code: Joi.string().required(),
});
