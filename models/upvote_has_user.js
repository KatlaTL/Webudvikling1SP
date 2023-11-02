'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Upvote_has_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Upvote_has_user.init({
    user_id: DataTypes.INTEGER,
    upvote_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Upvote_has_user',
  });
  return Upvote_has_user;
};