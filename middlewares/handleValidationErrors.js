const { validationResult } = require("express-validator");
const ApiError = require("../error/ApiError");

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return ApiError.validationError(res, { friendlyMsg: errors.errors[0] });
  }

  next();
}

module.exports = handleValidationErrors;
