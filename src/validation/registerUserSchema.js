import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().required().min(3).max(30).messages({
    'any.required': '{{#label}} Is Required!',
    'string.min': 'Min string length is not achieved!',
    'string.max': 'Maximum string length exceeded!',
  }),
  email: Joi.string().email().required().messages({
    'any.required': '{{#label}} Is Required!',
  }),
  password: Joi.string().required().messages({
    'any.required': '{{#label}} Is Required!',
  }),
});
