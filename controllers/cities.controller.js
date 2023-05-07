const ApiError = require("../error/ApiError");
const Cities = require("../models/City");

async function getAll(req, res) {
  try {
    const region_id = req.query.region;
    const query = {};

    if (region_id) query.region_id = region_id;

    const cities = await Cities.find(query).populate("region_id");

    res.ok(200, cities);
  } catch (error) {
    ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
  }
}

async function create(req, res) {
  try {
    const city = await Cities.create(req.body);

    res.ok(201, city);
  } catch (error) {
    ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
  }
}

async function getByID(req, res) {
  try {
    const city = await Cities.findById(req.params.id).populate("region_id");

    if (!city) {
      return ApiError.notFound(res, { friendlyMsg: "Not Found" });
    }

    res.ok(200, city);
  } catch (error) {
    ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
  }
}

async function update(req, res) {
  try {
    const city = await Cities.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!city) {
      return ApiError.notFound(res, { friendlyMsg: "Not Found" });
    }

    res.ok(200, city);
  } catch (error) {
    ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
  }
}

async function remove(req, res) {
  try {
    const city = await Cities.findByIdAndRemove(req.params.id);

    if (!city) {
      return ApiError.notFound(res, { friendlyMsg: "Not Found" });
    }

    res.ok(200, city);
  } catch (error) {
    ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
  }
}

module.exports = { getAll, create, getByID, update, remove };
