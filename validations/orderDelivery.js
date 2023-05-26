const { checkSchema } = require("express-validator");

const orderDeliveryCreateValidation = checkSchema({
  description: {
    optional: {},
    isString: {},
    errorMessage: "Description must be string type",
  },
  staff_id: {
    isMongoId: {},
    errorMessage: "Invalid stuff_id",
  },
  order_id: {
    isMongoId: {},
    errorMessage: "Invalid order_id",
  },
});

const orderDeliveryUpdateValidation = checkSchema({
  description: {
    isString: {},
    optional: {},
    errorMessage: "Description must be string type",
  },
  staff_id: {
    isMongoId: {},
    optional: {},
    errorMessage: "Invalid stuff_id",
  },
  order_id: {
    isMongoId: {},
    optional: {},
    errorMessage: "Invalid order_id",
  },
});

const queryValidation = checkSchema({
  staff: {
    isMongoId: {},
    optional: {},
    errorMessage: "Invalid Mongo ID",
  },
  order: {
    isMongoId: {},
    optional: {},
    errorMessage: "Invalid Mongo id Order",
  },
});

module.exports = {
  orderDeliveryCreateValidation,
  orderDeliveryUpdateValidation,
  queryValidation,
};
