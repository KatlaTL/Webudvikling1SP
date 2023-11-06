'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('User_permissions', [{
      permissions:'',
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('User_permissions', null, {});
  }
};

