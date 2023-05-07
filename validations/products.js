const { checkSchema } = require("express-validator");

const productCreateValidation = checkSchema({
  name: {
    isString: {},
    errorMessage: "Name must be a string",
  },
  price: {
    isNumeric: {},
  },
  category_id: {
    isMongoId: {
      errorMessage: "Invalid ID",
    },
  },
  staff_id: {
    isMongoId: {
      errorMessage: "Invalid ID",
    },
  },
  description: {
    isString: {},
    optional: {},
  },
});

const productUpdateValidation = checkSchema({
  name: {
    isString: {},
    optional: {},
    errorMessage: "Name must be a string",
  },
  price: {
    isNumeric: {},
    optional: {},
  },
  category_id: {
    optional: {},
    isMongoId: {
      errorMessage: "Invalid ID",
    },
  },
  staff_id: {
    optional: {},
    isMongoId: {
      errorMessage: "Invalid ID",
    },
  },
  description: {
    isString: {},
    optional: {},
  },
});

const sortValidation = checkSchema({
  sort_by: {
    isAlpha: {
      errorMessage: "Enter only letters",
    },
    // contains: ["name", "price", "createdAt"],
    isIn: {
      options: [["name", "price", "createdAt"]],
      errorMessage: "Required values - name, price, createdAt",
    },
  },
  order_by: {
    isIn: {
      options: [["asc", "desc", "1", "-1"]],
      errorMessage: "Required values - asc or 1, desc or -1",
    },
  },
});

module.exports = {
  productCreateValidation,
  productUpdateValidation,
  sortValidation,
};
