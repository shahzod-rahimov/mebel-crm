const { checkSchema } = require("express-validator");

const categoryValidation = checkSchema({
  name: {
    isString: {},
    errorMessage: "Name must be a string",
  },
});

module.exports = categoryValidation;
