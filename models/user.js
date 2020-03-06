'use strict';
const {hashPassword} = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
class User extends sequelize.Sequelize.Model{}
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty : {
          args : true,
          msg : 'email cannot empty'
        },
        isEmail : {
          args : true,
          msg : 'format email is wrong'
        },
        isUnique : (value, next) => {
          sequelize.models.User.findOne({
                where : {
                  email : value
                }
              })
              .then(user => {
                if(user){
                  next('email is already used')
                }
                else{
                  next()
                }
              })
              .catch(next)
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6],
          msg: 'password min 6 characters'
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user, option) => {
        user.password = hashPassword(user.password)
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Favorite, {through: models.UserFavorite})
  };
  return User;
};