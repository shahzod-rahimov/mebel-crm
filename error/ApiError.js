class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
  static badRequest(res, errorMessage) {
    return res.error(400, {
      message: errorMessage.message,
      friendlyMsg: errorMessage.friendlyMsg,
    });
  }
  static validationError(res, errorMessage) {
    return res.error(422, {
      message: errorMessage.message,
      friendlyMsg: errorMessage.friendlyMsg,
    });
  }
  static unauthorized(res, errorMessage) {
    return res.error(401, {
      message: errorMessage.message,
      friendlyMsg: errorMessage.friendlyMsg,
    });
  }
  static forbidden(res, errorMessage) {
    return res.error(403, {
      message: errorMessage.message,
      friendlyMsg: errorMessage.friendlyMsg,
    });
  }
  static notFound(res, errorMessage) {
    return res.error(404, {
      message: errorMessage.message,
      friendlyMsg: errorMessage.friendlyMsg,
    });
  }
  static internal(res, errorMessage) {
    console.log(errorMessage.message);
    return res.error(500, {
      friendlyMsg: errorMessage.friendlyMsg,
    });
  }
}

module.exports = ApiError;
