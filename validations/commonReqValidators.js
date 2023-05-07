const { checkSchema } = require("express-validator");

const queryPageValidation = checkSchema({
  page: {
    isNumeric: {},
    errorMessage: "Page query must be a number",
  },
});

const paramsIDValidation = checkSchema({
  id: {
    isMongoId: {},
    errorMessage: "Invalid ID",
  },
});

module.exports = { queryPageValidation, paramsIDValidation };
