const { checkSchema } = require("express-validator");

const regionsValidation = checkSchema({
  name: {
    isString: {},
    errorMessage: "Name must be a string",
  },
});

module.exports = regionsValidation;
