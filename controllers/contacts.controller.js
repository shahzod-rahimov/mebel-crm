const ApiError = require("../error/ApiError");
const { getUniqueID } = require("../helpers/getUniqueID");
const Contacts = require("../models/Contact");

async function getAll(req, res) {
  try {
    const page = +req.query.page || 1;
    const itemsPerPage = 10;
    const role = req.staff.role;
    const query = {};

    if (["ADMIN", "OPERATOR"].includes(role)) query.is_old = false;

    const contacts = await Contacts.find(query)
      .sort([["createdAt", -1]])
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage);

    const totalCount = await Contacts.countDocuments(query).exec();

    res.ok(200, {
      records: contacts,
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
    const countAll = await Contacts.countDocuments().exec();

    const unique_id = getUniqueID(countAll);

    const contact = await Contacts.create({ ...req.body, unique_id });

    res.ok(201, contact);
  } catch (error) {
    ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
  }
}

async function getByID(req, res) {
  try {
    const contact = await Contacts.findById(req.params.id);

    if (!contact) {
      return ApiError.notFound(res, { friendlyMsg: "Not Found" });
    }

    res.ok(200, contact);
  } catch (error) {
    ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
  }
}

async function getByUniqueID(req, res) {
  try {
    const contact = await Contacts.findOne({ unique_id: req.query.id });

    if (!contact) {
      return ApiError.notFound(res, { friendlyMsg: "Not Found" });
    }

    res.ok(200, contact);
  } catch (error) {
    ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
  }
}

async function update(req, res) {
  try {
    const contact = await Contacts.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!contact) {
      return ApiError.notFound(res, { friendlyMsg: "Not Found" });
    }

    res.ok(200, contact);
  } catch (error) {
    ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
  }
}

async function remove(req, res) {
  try {
    // const contact = await Contacts.findByIdAndRemove(req.params.id);

    // if (!contact) {
    //   return ApiError.notFound(res, { friendlyMsg: "Not Found" });
    // }

    // res.ok(200, contact);
    res.ok(200, "ok");
  } catch (error) {
    ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
  }
}

module.exports = { getAll, create, getByID, getByUniqueID, update, remove };
