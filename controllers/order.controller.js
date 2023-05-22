const ApiError = require("../error/ApiError");
const Order = require("../models/Order");

async function getAll(req, res) {
  try {
    const allOrders = await Order.find()
      .populate("product_id")
      .populate("contact_id")
      .populate("staff_id");

    if (allOrders.length < 1) {
      return ApiError.notFound(res, {
        message: "Information not found",
        friendlyMsg: "Database is empty",
      });
    }
    res.ok(200, allOrders);
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
async function getOrderWithSuccess(req, res) {
  try {
    const order = await Order.find({ status: 1 })
      .populate("product_id")
      .populate("staff_id")
      .populate("contact_id");
    if (order.length < 1) {
      return ApiError.notFound(res, {
        friendlyMsg: "Not found successfull orders",
      });
    }
    res.ok(200, order);
  } catch (error) {
    ApiError.internal(res, { message: error, friendlyMsg: "Server error" });
  }
}
async function getOrderWithFailure(req, res) {
  try {
    const order = await Order.find({ status: 2 })
      .populate("product_id")
      .populate("staff_id")
      .populate("contact_id");
    if (order.length < 1) {
      return ApiError.notFound(res, {
        friendlyMsg: "Not found order which was failure",
      });
    }
    res.ok(200, order);
  } catch (error) {
    ApiError.internal(res, { friendlyMsg: "Server Error" });
  }
}

async function filterOrderRegions(req, res) {
  try {
    const { region } = req.body;
    const order = await Order.find({ target_address: region })
      .populate("staff_id")
      .populate("contact_id")
      .populate("product_id");
    if (order.length < 1) {
      return ApiError.notFound(res, {
        friendlyMsg: "order not found in this region",
      });
    }
  } catch (error) {
    ApiError.internal(res, { friendlyMsg: "Server Error" });
  }
}

async function setStaffToOrder(req, res) {
  try {
    const { staff_id, product_id } = req.body;
    await Order.updateOne({ product_id: product_id }, { staff_id: staff_id });
    res.ok(200, {
      response: "updated success!",
      status: true,
    });
  } catch (error) {
    ApiError.internal(res, {
      friendlyMsg: "Error has been detected during process! Server error",
    });
  }
}

async function getStatisticsFromRegion(req, res) {
  try {
    const { region } = req.body;
    const orders = await Order.find({ address: region });
    if (orders.length < 1) {
      ApiError.notFound(res, {
        errorMessage: "Order is not found!",
      });
    }
    const response = {
      Orders: Order,
      ordersLength: orders.length,
    };
    res.ok(200, resp);
  } catch (error) {
    ApiError.internal(res, { friendlyMsg: "Server error" });
  }
}
module.exports = {
  getAll,
  create,
  getByID,
  update,
  remove,
  getOrderWithSuccess,
  getOrderWithFailure,
  filterOrderRegions,
  setStaffToOrder,
};
