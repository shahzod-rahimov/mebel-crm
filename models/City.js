const { Schema, model } = require("mongoose");

const CitySchema = new Schema(
  {
    name: { type: String },
    region_id: { type: Schema.Types.ObjectId, ref: "regions" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("cities", CitySchema);
