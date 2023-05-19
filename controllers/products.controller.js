const ApiError = require("../error/ApiError");
const Products = require("../models/Product");

async function getAll(req, res) {
  try {
    const page = +req.query.page || 1;
    const itemsPerPage = 10;
    const { sort_by, order_by } = req.query;

    const query = ["createdAt", -1];

    if (order_by || sort_by) {
      query[0] = sort_by;
      query[1] = order_by;
    }

    const products = await Products.find()
      .sort([query])
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage)
      .populate({ path: "category_id", select: "_id, name" })
      .populate({
        path: "staff_id",
        select: "_id full_name login phone_number",
      });

    const totalCount = await Products.countDocuments().exec();

    res.ok(200, {
      records: products,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / itemsPerPage),
        totalCount,
      },
    });
  } catch (error) {
    ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
  }
}

async function create(req, res) {
  try {
    const image = [];

    if (req.files) {
      req.files.forEach((obj) => {
        image.push(obj.filename);
      });
    }

    const { _id, name, price, images, updatedAt } = await Products.create({
      ...req.body,
      images: image,
    });

    res.ok(201, { _id, name, price, images, updatedAt });
  } catch (error) {
    ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
  }
}

async function getByID(req, res) {
  try {
    const product = await Products.findById(req.params.id);

    if (!product) {
      return ApiError.notFound(res, { friendlyMsg: "Not Found" });
    }

    res.ok(200, product);
  } catch (error) {
    ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
  }
}

async function update(req, res) {
  try {
    const product = await Products.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!product) {
      return ApiError.notFound(res, { friendlyMsg: "Not Found" });
    }

    res.ok(200, product);
  } catch (error) {
    ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
  }
}

async function remove(req, res) {
  try {
    const product = await Products.findByIdAndRemove(req.params.id);

    if (!product) {
      return ApiError.notFound(res, { friendlyMsg: "Not Found" });
    }

    res.ok(200, product);
  } catch (error) {
    ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
  }
}

module.exports = { getAll, create, getByID, update, remove };
