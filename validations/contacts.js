const { checkSchema } = require("express-validator");
const Contacts = require("../models/Contact");

const contactCreateValidation = checkSchema({
  phone_number: {
    // matches: {
    //   options: /^(33|50|77|88|(9[013-57-9]))\d{7}$/,
    //   errorMessage: "Invalid phone number",
    // },
    custom: {
      options: isPhoneExists,
    },
  },
  staff_id: {
    isMongoId: {},
    errorMessage: "Invalid ID",
  },
});

const contactUpdateValidation = checkSchema({
  phone_number: {
    // matches: {
    //   options: /^(33|50|77|88|(9[013-57-9]))\d{7}$/,
    //   errorMessage: "Invalid phone number",
    // },
    custom: {
      options: isPhoneExists,
    },
    optional: {},
  },
  staff_id: {
    isMongoId: {},
    optional: {},
    errorMessage: "Invalid ID",
  },
  status: {
    isInt: {
      errorMessage: "Status must be a number",
    },
    isIn: {
      options: [[1, 2, 3]],
      errorMessage: "Required values - 1, 2, 3",
    },
    optional: {},
  },
  is_old: {
    isBoolean: {},
    optional: {},
    errorMessage: "is_old must be a boolean",
  },
});

const queryValidation = checkSchema({
  id: {
    isAlphanumeric: {},
    matches: {
      options: /^[A-H]{2}\d{4,}$/,
    },
    errorMessage: "Invalid ID",
  },
});

async function isPhoneExists(value) {
  const phone_number = await Contacts.findOne({ phone_number: value });

  if (phone_number) {
    throw new Error("Phone number already exists");
  }
}

const checkStaffID = checkSchema({
  staff_id: {
    isMongoId: {
      errorMessage: "Invalid ID",
    },
  },
});

module.exports = {
  contactCreateValidation,
  contactUpdateValidation,
  queryValidation,
  checkStaffID,
};
