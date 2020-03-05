const { User } = require("../models");

module.exports = {
  check: (req, res, next) => {
    const id = req.decode.id;
    User.findByPk(id)
      .then(user => {
        if (user) {
          next();
        } else {
          const err = {
            name: "NotAuthorized",
            message: "you dont have authentifaction"
          };
          next(err);
        }
      })
      .catch(err => {
        const error = {
          name: "NotAuthorized",
          message: "you dont have authentifaction"
        };
        next(error);
      });
  }
};
