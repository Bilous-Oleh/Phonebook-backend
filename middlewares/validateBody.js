
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
  validateBody,
};
