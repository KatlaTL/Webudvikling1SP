'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      id: 1,
      email: 'example@example.com',
      Name: 'John Doe',
      avatarURL:'#',
      Role_id: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    }, 
    {
      id: 2,
      email: 'example@example.com',
      Name: 'John Doey Moey',
      avatarURL:'#',
      Role_id: '2',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
