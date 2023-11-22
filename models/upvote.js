'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Upvote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.User, { through: models.Upvote_has_user });
      this.belongsTo(models.Feature_request, { foreignKey: "feature_request_id" })
    }
  }
  Upvote.init({
    amount: DataTypes.INTEGER,
    feature_request_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Upvote',
  });
  return Upvote;
};