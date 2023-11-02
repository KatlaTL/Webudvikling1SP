'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feature_request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Feature_request.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    title: DataTypes.STRING(100),
    description: DataTypes.STRING,
    imageURL: DataTypes.STRING(255),
    allowNull: false,
    parent_feature_request_id: DataTypes.INTEGER,
    status_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    category_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Feature_request',
  });
  return Feature_request;
};