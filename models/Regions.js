const { Schema, model } = require("mongoose");

const RegionSchema = new Schema(
  {
    name: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("regions", RegionSchema);
