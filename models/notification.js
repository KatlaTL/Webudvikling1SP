'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.User, { through: models.User_has_notification });
    }
  }
  Notification.init({
    message: DataTypes.STRING(100)
  }, {
    sequelize,
    modelName: 'Notification',
  });
  return Notification;
};