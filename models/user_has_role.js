'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_has_role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User_has_role.init({
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id"
      }
    }, 
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Roles",
        key: "id"
      }
    },
  }, {
    sequelize,
    modelName: 'User_has_role',
  });
  return User_has_role;
};