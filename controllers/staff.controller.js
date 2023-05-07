const ApiError = require("../error/ApiError");
const Staff = require("../models/Staff");
const bcrypt = require("bcrypt");
const jwt = require("../services/JwtService");
const config = require("config");

async function getAll(req, res) {
  try {
    const page = +req.query.page || 1;
    const itemsPerPage = 10;

    const staff = await Staff.find()
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage);

    const totalCount = await Staff.countDocuments().exec();

    res.ok(200, {
      records: staff,
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
    const password = bcrypt.hashSync(req.body.password, 7);

    const staff = await Staff.create({ ...req.body, password });

    const payload = {
      id: staff._id,
      role: staff.role,
      is_active: staff.is_active,
    };

    const tokens = jwt.generateTokens(payload);
    const hashed_token = bcrypt.hashSync(tokens.refreshToken, 7);
    staff.hashed_token = hashed_token;

    await staff.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_token_ms"),
      httpOnly: true,
    });

    res.ok(200, { token: tokens.accessToken, staff: payload });
  } catch (error) {
    ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
  }
}

async function signin(req, res) {
  try {
    const { login, password } = req.body;

    const staff = await Staff.findOne({ login });

    if (!staff.is_active) {
      return ApiError.badRequest(res, { friendlyMsg: "You are not an active" });
    }

    const comparePassword = bcrypt.compareSync(password, staff.password);

    if (!comparePassword) {
      return ApiError.badRequest(res, {
        friendlyMsg: "Login or password wrong",
      });
    }

    const payload = {
      id: staff._id,
      role: staff.role,
      is_active: staff.is_active,
    };

    const tokens = jwt.generateTokens(payload);
    const hashed_token = bcrypt.hashSync(tokens.refreshToken, 7);
    staff.hashed_token = hashed_token;

    await staff.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_token_ms"),
      httpOnly: true,
    });

    res.ok(200, { token: tokens.accessToken, staff: payload });
  } catch (error) {
    ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
  }
}

async function activate(req, res) {
  try {
    const { id, value } = req.body;

    const staff = await Staff.findByIdAndUpdate(
      id,
      { is_active: value },
      { new: true }
    );

    if (!staff) {
      return ApiError.notFound(res, { friendlyMsg: "Not Found" });
    }

    res.ok(200, staff);
  } catch (error) {
    ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
  }
}

async function getByID(req, res) {
  try {
    const staff = await Staff.findById(req.params.id);

    if (!staff) {
      return ApiError.notFound(res, { friendlyMsg: "Not Found" });
    }

    res.ok(200, staff);
  } catch (error) {
    ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
  }
}

async function update(req, res) {
  try {
    const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!staff) {
      return ApiError.notFound(res, { friendlyMsg: "Not Found" });
    }

    res.ok(200, staff);
  } catch (error) {
    ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
  }
}

async function remove(req, res) {
  try {
    const staff = await Staff.findByIdAndRemove(req.params.id);

    if (!staff) {
      return ApiError.notFound(res, { friendlyMsg: "Not Found" });
    }

    res.ok(200, staff);
  } catch (error) {
    ApiError.internal(res, { message: error, friendlyMsg: "Server Error" });
  }
}

module.exports = { getAll, create, getByID, update, remove, signin, activate };
