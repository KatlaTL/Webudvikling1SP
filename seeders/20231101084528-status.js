'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Statuses', [
      {
      status:'Under Review',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      status:'Planned',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      status:'In Progress',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      status:'Completed',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      status:'Closed',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Statuses', null, {});
  }
};
