const ApiError = require("../error/ApiError");
const Regions = require("../models/Regions");

async function getAll(req, res) {
  try {
    const regions = await Regions.find();

    res.ok(200, regions);
  } catch (error) {
    ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
  }
}

async function create(req, res) {
  try {
    const region = await Regions.create(req.body);

    res.ok(201, region);
  } catch (error) {
    ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
  }
}

async function getByID(req, res) {
  try {
    const region = await Regions.findById(req.params.id);

    if (!region) {
      return ApiError.notFound(res, { friendlyMsg: "Not Found" });
    }

    res.ok(200, region);
  } catch (error) {
    ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
  }
}

async function update(req, res) {
  try {
    const region = await Regions.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!region) {
      return ApiError.notFound(res, { friendlyMsg: "Not Found" });
    }

    res.ok(200, region);
  } catch (error) {
    ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
  }
}

async function remove(req, res) {
  try {
    const region = await Regions.findByIdAndRemove(req.params.id);

    if (!region) {
      return ApiError.notFound(res, { friendlyMsg: "Not Found" });
    }

    res.ok(200, region);
  } catch (error) {
    ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
  }
}

module.exports = { getAll, create, getByID, update, remove };
