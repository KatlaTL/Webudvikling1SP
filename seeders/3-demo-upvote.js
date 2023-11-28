'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Upvotes', [{
      createdAt: new Date(),
      updatedAt: new Date(),
      feature_request_id: 1537979745
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      feature_request_id: 1537979746
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      feature_request_id: 1537979747
    }]
  )},

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Upvotes', null, {});
  }
};
