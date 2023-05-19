const { Schema, model } = require("mongoose");
const config = require("config");

const ProductSchema = new Schema(
  {
    name: { type: String },
    images: { type: [Schema.Types.String], get: getImages },
    price: { type: Number },
    category_id: { type: Schema.Types.ObjectId, ref: "categories" },
    staff_id: { type: Schema.Types.ObjectId, ref: "staffs" },
    description: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: { getters: true },
  }
);

function getImages(images) {
  const urls = [];
  for (let i of images) {
    urls.push(`${config.get("base_url")}/images/${i}`);
  }
  return urls;
}

module.exports = model("products", ProductSchema);
