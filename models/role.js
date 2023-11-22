'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.User, { through: models.User_has_role });
      this.belongsToMany(models.Permission, { through: models.Role_has_permission });
    }
  }
  Role.init({
    role: DataTypes.STRING(100),
    description: DataTypes.STRING(200)
  }, {
    sequelize,
    modelName: 'Role',
  });

  return Role;
};