const Jwt = require("../services/JwtService");

module.exports = async function (req, res, next) {
  if (req.method === "OPTIONS") {
    return next();
  }

  if (req.path.includes("auth")) {
    return next();
  }
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.error(401, { message: "Access denied" });
    }
    const token = authorization.split(" ")[1];
    if (!token) {
      return res.error(401, { message: "Access denied" });
    }
    const decodedData = await Jwt.verifyAccess(token);

    if (!decodedData) {
      return res.error(401, { message: "Access denied" });
    }

    req.staff = decodedData;

    if (!decodedData.is_active) {
      return res.error(401, { message: "Access denied" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.error(400, { message: error.message });
  }
};
