'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      id: 1,
      email: 'example1@example.com',
      Name: 'John Doe',
      avatarURL:'#',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      email: 'example2@example.com',
      Name: 'John Doey Moey',
      avatarURL:'#',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 3,
      email: 'example3@example.com',
      Name: 'John Doey Moey dony',
      avatarURL:'#',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 4,
      email: 'example4@example.com',
      Name: 'John Doey Moey dony sony',
      avatarURL:'#',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
