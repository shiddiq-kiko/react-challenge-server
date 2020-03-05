'use strict';
module.exports = (sequelize, DataTypes) => {
  class UserFavorite extends sequelize.Sequelize.Model{}
  UserFavorite.init({
    UserId: DataTypes.INTEGER,
    FavoriteId: DataTypes.INTEGER
  }, {
    sequelize
  });
  UserFavorite.associate = function(models) {
    // associations can be defined here
    UserFavorite.belongsTo(models.Favorite)
    UserFavorite.belongsTo(models.User)
  };
  return UserFavorite;
};