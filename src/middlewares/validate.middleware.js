const { validationResult } = require('express-validator');
const ApiError = require('../utils/ApiError');

// Runs after express-validator checks in routes, collects errors into one clean response
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map((err) => err.msg);
    throw new ApiError(400, messages.join(', '));
  }
  next();
};

module.exports = validate;