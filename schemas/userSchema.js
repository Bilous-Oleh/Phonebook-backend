const Joi = require ("joi")

const signUpSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  
  const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  module.exports = {
    signUpSchema,
    loginSchema
  }