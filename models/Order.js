const { Schema, model } = require("mongoose");

const OrderSchema = new Schema(
  {
    full_name: { type: String },
    address: { type: String },
    target_address: { type: String },
    status: { type: Number, min: 1, max: 2 },
    description: { type: String },
    product_id: { type: Schema.Types.ObjectId, ref: "products" },
    contact_id: { type: Schema.Types.ObjectId, ref: "contacts" },
    staff_id: { type: Schema.Types.ObjectId, ref: "staffs" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("orders", OrderSchema);
