const { User, Favorite } = require("../models");
const { createToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bcrypt");

class UserController {
  static register(req, res, next) {
    const newUser = {
      email: req.body.email,
      password: req.body.password
    };
    User.create(newUser)
      .then(user => {
        const userToToken = {
          id: user.id,
          user: user.email
        };
        const token = createToken(userToToken);
        res.status(201).json(token);
      })
      .catch(next);
  }
  static login(req, res, next) {
    const userLogin = {
      email: req.body.email,
      password: req.body.password
    };
    User.findOne({
      where: {
        email: userLogin.email
      }
    })
      .then(user => {
        if (user) {
          const checkPassword = comparePassword(
            userLogin.password,
            user.password
          );
          if (checkPassword) {
            const userToToken = {
              id: user.id,
              user: user.email
            };
            const token = createToken(userToToken);
            res.status(201).json(token);
          } else {
            const err = {
              name: "LoginError",
              message: "wrong email / password"
            };
            next(err);
          }
        } else {
          const err = {
            name: "LoginError",
            message: "wrong email / password"
          };
          next(err);
        }
      })
      .catch(next);
  }
}

module.exports = UserController;
