import Joi from 'joi';

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'any.required': '{{#label}} Is Required!',
    'string.min': 'Min string length is not achieved!',
    'string.max': 'Maximum string length exceeded!',
  }),
  phoneNumber: Joi.string(),
  email: Joi.string().email().required().messages({
    'any.required': '{{#label}} Is Required!',
  }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
  photo: Joi.string(),
});
