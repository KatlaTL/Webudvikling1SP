'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Feature_request, { foreignKey: "feature_request_id" });
      this.belongsTo(models.User), { foreignKey: "user_id" };
    }
  }
  Comment.init({
    comment: DataTypes.STRING(2000),
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id"
      }
    },
    feature_request_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Feature_requests",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};