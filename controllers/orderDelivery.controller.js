const ApiError = require("../error/ApiError");
const OrderDelivery = require("../models/OrderDelivery");

async function getAll(req, res) {
  try {
    const orderDeliveries = await OrderDelivery.find().populate("order_id").populate("staff_id");
    if(orderDeliveries.length >= 1) {
        res.ok(200,orderDeliveries)
    } else {
        ApiError.notFound(res,{errorMessage:"Not found ! Database is empty"})
    }
  } catch (error) {
    ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
  }
}

async function create(req, res) {
  try {
    const orderDelivery = await OrderDelivery.create(req.body);

    res.ok(201, orderDelivery);
  } catch (error) {
    ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
  }
}

async function getByID(req, res) {
  try {
    const order = await OrderDelivery.findById(req.id).populate("order_id").populate("stuff_id")

    if (!order) {
      return ApiError.notFound(res, { friendlyMsg: "Not Found" });
    }

    res.ok(200, order);
  } catch (error) {
    ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
  }
}

async function update(req, res) {
  try {
    const order = await OrderDelivery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!order) {
      return ApiError.notFound(res, { friendlyMsg: "Not Found" });
    }

    res.ok(200, order);
  } catch (error) {
    ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
  }
}

async function remove(req, res) {
  try {
    const orderDelivery = await OrderDelivery.findByIdAndRemove(req.params.id);

    if (!orderDelivery) {
      return ApiError.notFound(res, { friendlyMsg: "Not Found" });
    }

    res.ok(200, orderDelivery);
  } catch (error) {
    ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
  }
}

module.exports = { getAll, create, getByID, update, remove };
