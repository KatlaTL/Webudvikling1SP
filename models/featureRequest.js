'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class featureRequest extends Model {
    static associate(models) {
    }
  }
  featureRequest.init({
    category: DataTypes.STRING,
    title: DataTypes.STRING,
    details: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'featureRequest',
  });
  return featureRequest;
};