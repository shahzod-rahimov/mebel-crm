const { Schema, model } = require("mongoose");

const OrderDeliverySchema = new Schema(
  {
    order_id: { type: Schema.Types.ObjectId, ref: "orders" },
    staff_id: { type: Schema.Types.ObjectId, ref: "staffs" },
    description: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("order-deliveries", OrderDeliverySchema);
