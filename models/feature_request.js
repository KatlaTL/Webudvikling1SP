'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class feature_request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  feature_request.init({
    title: DataTypes.STRING(100),
    description: DataTypes.STRING,
    imageURL: DataTypes.STRING(255),
    allowNull: false,
    parent_feature_request_id: DataTypes.INTEGER,
    status_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    category_id: DataTypes.STRING,
    upvote_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'feature_request',
  });
  return feature_request;
};