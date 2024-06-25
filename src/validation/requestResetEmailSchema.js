import Joi from 'joi';

export const requestResetEmailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': '{{#label}} Is Required!',
  }),
});
