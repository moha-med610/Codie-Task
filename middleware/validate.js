const { validationResult } = require("express-validator");
const AppError = require("../utils/appError");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map(err => err.msg);
    return next(AppError.error(400, "Bad Request", extractedErrors.join(", ")));
  }
  next();
};

module.exports = validate;
