import Joi from 'joi';

export const resetPasswordSchema = Joi.object({
  password: Joi.string().required().messages({
    'any.required': '{{#label}} Is Required!',
  }),
  token: Joi.string().required().messages({
    'any.required': '{{#label}} Is Required!',
  }),
});
