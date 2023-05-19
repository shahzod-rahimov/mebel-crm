const { checkSchema } = require("express-validator");
const Staff = require("../models/Staff");

const signupValidation = checkSchema({
  full_name: {
    isString: {},
    errorMessage: "Full name must be a string",
  },
  phone_number: {
    // matches: {
    //   options: /^(33|50|77|88|(9[013-57-9]))\d{7}$/,
    // },
    custom: {
      options: async (value) => {
        const phone_number = await Staff.findOne({ phone_number: value });

        if (phone_number) {
          throw new Error("Phone number already exists");
        }
      },
    },
    errorMessage: "Invalid phone number",
  },
  card: {
    isString: {},
  },
  login: {
    isString: {},
    custom: {
      options: async (value) => {
        const login = await Staff.findOne({ login: value });

        if (login) {
          throw new Error("Login already in use");
        }
      },
    },
  },
  password: {
    isString: {},
  },
  role: {
    isIn: {
      options: [["SUPER-ADMIN", "ADMIN", "OPERATOR", "DELIVERYMAN"]],
      errorMessage:
        "Required values - [SUPER-ADMIN, ADMIN, OPERATOR, DELIVERYMAN]",
    },
  },
});

const signinValidation = checkSchema({
  login: {
    isString: {},
    custom: {
      options: async (value) => {
        const login = await Staff.findOne({ login: value });

        if (!login) {
          throw new Error("Login or password wrong");
        }
      },
    },
  },
  password: {
    isString: {},
  },
});

const updateValidation = checkSchema({
  full_name: {
    isString: {},
    optional: {},
    errorMessage: "Full name must be a string",
  },
  phone_number: {
    // matches: {
    //   options: /^(33|50|77|88|(9[013-57-9]))\d{7}$/,
    // },
    optional: {},
    custom: {
      options: async (value) => {
        const phone_number = await Staff.findOne({ phone_number: value });

        if (phone_number) {
          throw new Error("Phone number already exists");
        }
      },
    },
    errorMessage: "Invalid phone number",
  },
  card: {
    isString: {},
    optional: {},
  },
  login: {
    isString: {},
    optional: {},
    custom: {
      options: async (value) => {
        const login = await Staff.findOne({ login: value });

        if (login) {
          throw new Error("Login already in use");
        }
      },
    },
  },
  role: {
    optional: {},
    isIn: {
      options: ["SUPER-ADMIN", "ADMIN", "OPERATOR", "DELIVERYMAN"],
      errorMessage:
        "Required values - [SUPER-ADMIN, ADMIN, OPERATOR, DELIVERYMAN]",
    },
  },
});

const activateValidation = checkSchema({
  id: {
    isMongoId: {},
    errorMessage: "Invalid ID",
  },
  value: {
    isBoolean: {},
    errorMessage: "Required values true or false",
  },
});

module.exports = {
  signupValidation,
  signinValidation,
  updateValidation,
  activateValidation,
};
