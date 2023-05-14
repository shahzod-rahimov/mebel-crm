const { Schema, model } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const ContactSchema = new Schema(
  {
    unique_id: { type: String, default: uuidv4() },
    phone_number: { type: String },
    status: { type: Number, min: 1, max: 3 },
    is_old: { type: Boolean, default: false },
    staff_id: { type: Schema.Types.ObjectId, ref: "staffs" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("contacts", ContactSchema);
