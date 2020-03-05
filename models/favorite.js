'use strict';
module.exports = (sequelize, DataTypes) => {
  class Favorite extends sequelize.Sequelize.Model{}
  Favorite.init({
    mal_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    image_url: DataTypes.STRING,
    trailer_url: DataTypes.STRING,
    type: DataTypes.STRING,
    score: DataTypes.FLOAT,
    synopsis: DataTypes.TEXT
  }, {
    sequelize
  });
  Favorite.associate = function(models) {
    // associations can be defined here
    Favorite.belongsToMany(models.User, {through: models.UserFavorite})
  };
  return Favorite;
};