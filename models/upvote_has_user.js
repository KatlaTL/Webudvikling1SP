'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class upvote_has_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  upvote_has_user.init({
    user_id: DataTypes.INTEGER,
    upvote_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'upvote_has_user',
  });
  return upvote_has_user;
};