const ApiError = require("../error/ApiError");
const Category = require("../models/Category");

async function getAll(req, res) {
  try {
    const categories = await Category.find();

    res.ok(200, categories);
  } catch (error) {
    ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
  }
}

async function create(req, res) {
  try {
    const category = await Category.create(req.body);

    res.ok(201, category);
  } catch (error) {
    ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
  }
}

async function getByID(req, res) {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return ApiError.notFound(res, { friendlyMsg: "Not Found" });
    }

    res.ok(200, category);
  } catch (error) {
    ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
  }
}

async function update(req, res) {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!category) {
      return ApiError.notFound(res, { friendlyMsg: "Not Found" });
    }

    res.ok(200, category);
  } catch (error) {
    ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
  }
}

async function remove(req, res) {
  try {
    const category = await Category.findByIdAndRemove(req.params.id);

    if (!category) {
      return ApiError.notFound(res, { friendlyMsg: "Not Found" });
    }

    res.ok(200, category);
  } catch (error) {
    ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
  }
}

module.exports = { getAll, create, getByID, update, remove };
