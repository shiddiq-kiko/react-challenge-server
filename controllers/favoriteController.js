const { User, UserFavorite, Favorite } = require("../models");

class FavoriteController {
  static inputFavorite(req, res, next) {
    const newFavorite = {
      mal_id: req.body.mal_id,
      title: req.body.title,
      url: req.body.url,
      image_url: req.body.image_url,
      trailer_url: req.body.trailer_url,
      type: req.body.type,
      score: req.body.score,
      synopsis: req.body.synopsis
    };
    //   console.log(newFavorite)
    User.findOne({
      where: {
        id: req.decode.id
      },
      include: Favorite
    })
      .then(user => {
        // console.log(user.Favorites)
        for (let i = 0; i < user.Favorites.length; i++) {
          console.log(i);
          if (user.Favorites[i].mal_id === newFavorite.mal_id) {
            const err = {
              name: "FavoriteFailed",
              message: `you already add ${newFavorite.title} to your favorite`
            };
            console.log(err);
            throw err;
          }
        }
        return Favorite.create(newFavorite);
      })
      .then(favorite => {
        const inputToConjunction = {
          UserId: req.decode.id,
          FavoriteId: favorite.id
        };
        return UserFavorite.create(inputToConjunction);
      })
      .then(favorite => {
        res.status(201).json(favorite);
      })
      .catch(next);
  }
  static readFavorite(req, res, next) {
    const id = req.decode.id;
    User.findOne({
      where: {
        id
      },
      include: Favorite
    })
      .then(favorites => {
        const allFavorite = favorites.Favorites.map(el => {
          return el.dataValues;
        });
        res.status(200).json(allFavorite);
      })
      .catch(next);
  }
  static deleteFavorite(req, res, next) {
    const id = req.decode.id;
    const mal_id = +req.headers.mal_id;
    let findFavorite = {};
    User.findOne({
      where: {
        id
      },
      include: Favorite
    })
      .then(({ Favorites }) => {
        findFavorite = Favorites.find(el => el.mal_id === mal_id);
        return UserFavorite.destroy({
          where: {
            UserId: id,
            FavoriteId: findFavorite.id
          }
        });
      })
      .then(success => {
        return Favorite.destroy({
          where: {
            id: findFavorite.id
          }
        });
      })
      .then(success => {
        res.status(200).json(success);
      })
      .catch(next);
  }
}

module.exports = FavoriteController;
