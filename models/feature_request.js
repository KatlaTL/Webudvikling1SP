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
      this.hasOne(models.Upvote, { foreignKey: "feature_request_id" });
      this.hasMany(models.Comment, { foreignKey: "feature_request_id" });
      this.belongsTo(models.Status, { foreignKey: "status_id" });
      this.belongsTo(models.Category, { foreignKey: "category_id" });
      this.belongsTo(models.User, { foreignKey: "user_id" });
      this.belongsTo(this, { foreignKey: "parent_feature_request_id" });
    }
  }
  Feature_request.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    title: DataTypes.STRING(100),
    description: DataTypes.STRING(500),
    imageURL: DataTypes.STRING,
    parent_feature_request_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Feature_requests",
        key: "id"
      }
    },
    status_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Statuses",
        key: "id"
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id"
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Categories",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'Feature_request',
  });
  return Feature_request;
};