'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role_has_permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Role_has_permission.init({
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Roles",
        key: "id"
      }
    },
    permission_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Permission",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'Role_has_permission',
  });
  return Role_has_permission;
};