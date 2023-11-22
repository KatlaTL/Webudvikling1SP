'use strict';
const {
  Model, DATE
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Role, { through: models.User_has_role });
      this.belongsToMany(models.Notification, { through: models.User_has_notification });
      this.belongsToMany(models.Upvote, { through: models.Upvote_has_user });
      this.hasMany(models.Comment, { foreignKey: "user_id" });
      this.hasMany(models.Feature_request, { foreignKey: "user_id" });
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    email: DataTypes.STRING(100),
    name: DataTypes.STRING(50),
    avatarURL: DataTypes.STRING(255)
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};