"use strict";

const ApplicationModel = require("./application_model");

module.exports = (sequelize, DataTypes) => {
  class Post extends ApplicationModel {
    static fullScope (userModel, upvoteModel) {
      return { include: [{ model: userModel }, { model: upvoteModel, include: [upvoteModel.User] }] };
    }

    static async syncUpvotes() {
      // i know this load the entire thing in the ram and i should do it using streams instead
      // but for now it wont be a problem since the dabase will not get too big
      const posts = await Post.findAll({include: [this.Upvote]});
      posts.forEach(async (o) => {
        const upvotesRealValue = o.Upvotes.length;
        o.upvotesCount = upvotesRealValue;
        o.save();
      });
    }

    static associate (models) {
      models.Post.User = models.Post.belongsTo(models.User, { foreignKey: "UserId" });
      models.Post.Upvote = models.Post.hasMany(models.Upvote);
    }
  }
  Post.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "title cant be null"
        },
        len: {
          args: [3, 128],
          msg: "title must contain between 3 and 128 characters."
        }
      }
    },
    upvotesCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "content cant be null"
        },
        len: {
          args: [10, 3000],
          msg: "content must contain between 10 and 3000 characters."
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Users", key: "id" }
    }
  }, {
    sequelize,
    modelName: "Post"
  });
  return Post;
};
