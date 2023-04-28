const { validationResult } = require("express-validator");

const validateBody = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json(
      errors
        .formatWith(({ msg, param }) => ({
          msg,
          param,
        }))
        .array()[0]
    );
  next();
};

module.exports = {
  validateBody,
};
