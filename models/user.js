'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    email: DataTypes.STRING(100),
    name: DataTypes.STRING(50),
    avatarURL: DataTypes.STRING(255),
    role_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};