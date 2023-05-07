const jwt = require("jsonwebtoken");
const config = require("config");

class JwtService {
  constructor(accesKey, refreshKey, accesTime, refreshTime) {
    this.accessKey = accesKey;
    this.refreshKey = refreshKey;
    this.accessTime = accesTime;
    this.refreshTime = refreshTime;
  }

  async verifyAccess(token) {
    return jwt.verify(token, this.accessKey, {});
  }
  async verifyRefresh(token) {
    return jwt.verify(token, this.refreshKey, {});
  }

  generateTokens(payload) {
    const accessToken = jwt.sign(payload, this.accessKey, {
      expiresIn: this.accessTime,
    });
    const refreshToken = jwt.sign(payload, this.refreshKey, {
      expiresIn: this.refreshTime,
    });
    return {
      accessToken,
      refreshToken,
    };
  }
}

module.exports = new JwtService(
  config.get("access_key"),
  config.get("refresh_key"),
  config.get("access_time"),
  config.get("refresh_time")
);
