const { Schema, model } = require("mongoose");

const CategorySchema = new Schema(
  {
    name: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("categories", CategorySchema);
