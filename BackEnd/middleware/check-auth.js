const HttpError = require("../models/http-error");
const userPermissionValidation = require("../shared/authorization/userPermissionValidation");
const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next(); // allows option request to continue without token
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; //Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error("Authentication failed!");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_Key);

    req.userData = { id: decodedToken.id, upv: decodedToken.upv }; //upv user permission validation
    next();
  } catch (error) {
    console.log(error);
    return next(
      new HttpError("Authentication Failed, Session Expired or Invalid", 403)
    );
  }
};
