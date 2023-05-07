const ApiError = require("../error/ApiError");
const Order = require("../models/Order");

async function getAll(req, res) {
    try {
      const allOrders = await Order.find().populate("product_id").populate("contact_id").populate("staff_id");
      if(allOrders.length < 1) {
        ApiError.notFound(res,{message:"Information not found",friendlyMsg:"Database is empty"})
      }
      res.ok(200, cities);
    } catch (error) {
      ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
    }
  }
  
  async function create(req, res) {
    try {
      const order = await Order.create(req.body);
  
      res.ok(201, order);
    } catch (error) {
      ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
    }
  }
  
  async function getByID(req, res) {
    try {
      const order = await Order.findById(req.params.id);
  
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
      const city = await Order.findByIdAndUpdate(req.params.id, req.body, {
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
      const order = await Order.findByIdAndRemove(req.params.id);
  
      if (!order) {
        return ApiError.notFound(res, { friendlyMsg: "Not Found" });
      }
  
      res.ok(200, order);
    } catch (error) {
      ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
    }
  }
  
module.exports = { getAll, create, getByID, update, remove };
  