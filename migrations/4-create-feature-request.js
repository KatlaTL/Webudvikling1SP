'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Feature_requests', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      imageURL: {
        allowNull: true,
        type: Sequelize.STRING
      },
      parent_feature_request_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "Feature_requests",
          id: "id"
        }
      },
      status_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Statuses",
          id: "id"
        }
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          id: "id"
        }
      },
      category_id: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: "Categories",
          id: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Feature_requests');
  }
};