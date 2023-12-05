'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('User_has_roles', [{
      user_id: 1,
      role_id: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      user_id: 1,
      role_id: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      user_id: 2,
      role_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      user_id: 2,
      role_id: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      user_id: 3,
      role_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      user_id: 3,
      role_id: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      user_id: 4,
      role_id: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
   
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('User_has_roles', null, {});
     */
  }
};
