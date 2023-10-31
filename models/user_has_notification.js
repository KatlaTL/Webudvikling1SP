'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_has_notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_has_notification.init({
    user_id: DataTypes.INTEGER,
    notification_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_has_notification',
  });
  return user_has_notification;
};