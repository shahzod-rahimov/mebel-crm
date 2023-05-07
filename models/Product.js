const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
  {
    name: { type: String },
    images: { type: [Schema.Types.String] },
    price: { type: Number },
    category_id: { type: Schema.Types.ObjectId, ref: "categories" },
    staff_id: { type: Schema.Types.ObjectId, ref: "staffs" },
    description: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("products", ProductSchema);
