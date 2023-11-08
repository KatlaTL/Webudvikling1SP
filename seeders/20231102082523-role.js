'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Roles', [{
      role:'SuperAdmin',
      description: "Permission to do everything",
      createdAt: new Date(),
      updatedAt: new Date()
    },  {
      role:'Admin',
      description: "Permissions to access the admin page",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      role:'Staff',
      description: "Marks a user as staff",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      role:'EmailNotifications',
      description: "Permissions to recieve email notifications about new requests and comments",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      role:'User',
      description: "Permissions to create new feature requests, upvote and comment",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};

