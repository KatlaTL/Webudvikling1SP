'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Role, { through: models.Role_has_permission });
    }
  }
  Permission.init({
    permission: DataTypes.STRING(100),
    description: DataTypes.STRING(200)
  }, {
    sequelize,
    modelName: 'Permission',
  });
  return Permission;
};