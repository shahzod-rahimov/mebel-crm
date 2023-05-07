const { Schema, model } = require("mongoose");

const StaffSchema = new Schema(
  {
    full_name: { type: String },
    phone_number: { type: String },
    card: { type: String },
    login: { type: String, unique: true, required: true },
    password: {
      type: String,
      min: [6, "Must be at least 6, got {VALUE}"],
      max: [20, "Must be less than 20, got {VALUE}"],
    },
    role: {
      type: String,
      enum: {
        values: ["SUPER-ADMIN", "ADMIN", "OPERATOR", "DELIVERYMAN"],
        message: "{VALUE} is not supported",
      },
    },
    hashed_token: { type: String },
    is_active: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("staffs", StaffSchema);
