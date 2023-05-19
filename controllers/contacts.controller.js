const ApiError = require("../error/ApiError");
const Contacts = require("../models/Contact");
const { join } = require("path");
const excelToJson = require("convert-excel-to-json");
const { unlinkSync } = require("fs");

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

async function getRandomContact(req, res) {
  try {
    const count = await Contacts.count({ is_old: false }).exec();
    const random = Math.floor(Math.random() * count);
    const randomContact = await Contacts.findOne().skip(random);
    res.ok(200, randomContact);
  } catch (error) {
    ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
  }
}

async function create(req, res) {
  try {
    const contact = await Contacts.create(req.body);

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
    const contact = await Contacts.findByIdAndRemove(req.params.id);

    if (!contact) {
      return ApiError.notFound(res, { friendlyMsg: "Not Found" });
    }

    res.ok(200, contact);
  } catch (error) {
    ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
  }
}

async function uploadFromFile(req, res) {
  try {
    const { staff_id } = req.body;
    const { filename } = req.file;
    const filePath = join(__dirname, "..", "public");

    const result = excelToJson({
      sourceFile: `${filePath}/${filename}`,
    }).Sheet1;

    for (let obj of result) {
      const phone_number = obj.A;

      const isExists = await Contacts.findOne({
        phone_number: { $regex: `${phone_number}` },
      });

      if (isExists) {
        continue;
      }

      await Contacts.create({ phone_number, staff_id });
    }

    unlinkSync(`${filePath}/${filename}`, function (err) {
      if (err) {
        return ApiError.internal(res, {
          message: err,
          friendlyMsg: "Server error",
        });
      }

      console.info("file deleted successfully");
    });

    res.ok(200, { friendlyMsg: "File uploaded successfully" });
  } catch (error) {
    ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
  }
}
module.exports = {
  getAll,
  create,
  getByID,
  getByUniqueID,
  update,
  remove,
  uploadFromFile,
  getRandomContact,
};
