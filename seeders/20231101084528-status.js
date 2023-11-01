'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Statuses', [
      {
      status:'Under Review'
    },
    {
      status:'Planned'
    },
    {
      status:'In Progress'
    },
    {
      status:'Completed'
    },
    {
      status:'Closed'
    } 
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Statuses', null, {});
  }
};
