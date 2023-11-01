'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
   /* await queryInterface.bulkInsert('People', [{
      name: 'John Doe',
      isBetaMember: false
    }], {});
*/
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('People', null, {});
  }
};
