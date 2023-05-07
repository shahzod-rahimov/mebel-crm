const Jwt = require("../services/JwtService");

module.exports = function (...requiredRoles) {
  if (!requiredRoles.length) {
    throw new Error("Role does not exists");
  }

  return async function (req, res, next) {
    const authorization = req.headers.authorization;
    const token = authorization.split(" ")[1];
    const decodedData = await Jwt.verifyAccess(token);

    const staff = decodedData;

    for (let i of requiredRoles) {
      if (staff.role === i) return next();
    }

    res.error(400, {
      message: `You are not ${requiredRoles.join(" or ")}`,
    });
  };
};
