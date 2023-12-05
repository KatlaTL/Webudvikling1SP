'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Feature_request, { foreignKey: "category_id" });
    }
  }
  Category.init({
    category: DataTypes.STRING(30)
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};