import Joi from 'joi';

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': '{{#label}} Is Required!',
  }),
  password: Joi.string().required().messages({
    'any.required': '{{#label}} Is Required!',
  }),
});
