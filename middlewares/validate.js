const Joi = require("joi");

const signUpSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const validateBody = (schema) => {
  const validated = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({
        message: error.message,
      });
      return;
    }
    next();
  };
  return validated;
};

module.exports = {
  signUpSchema,
  loginSchema,
  validateBody,
};
