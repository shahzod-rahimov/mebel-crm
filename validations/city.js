const { checkSchema } = require("express-validator");

const cityCreateValidation = checkSchema({
  name: {
    isString: {},
    errorMessage: "Name must be a string",
  },
  region_id: {
    isMongoId: {},
    errorMessage: "Invalid ID",
  },
});

const cityUpdateValidation = checkSchema({
  name: {
    isString: {},
    optional: {},
    errorMessage: "Name must be a string",
  },
  region_id: {
    isMongoId: {},
    optional: {},
    errorMessage: "Invalid ID",
  },
});

const queryValidation = checkSchema({
  region: {
    isMongoId: {},
    optional: {},
    errorMessage: "Invalid ID",
  },
});

module.exports = {
  cityCreateValidation,
  cityUpdateValidation,
  queryValidation,
};
