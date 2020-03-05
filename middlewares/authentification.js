const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = {
  auth: (req, res, next) => {
    try {
      const decoded = jwt.verify(req.headers.token, process.env.SECRET);
      req.decode = decoded;
      next()
    } catch (err) {
      next(err);
    }
  }
};
