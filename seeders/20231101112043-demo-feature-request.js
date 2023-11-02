'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    return queryInterface.bulkInsert('Feature_requests', [{
      id: 1537979745,
      title: "some title",
      description: "some description",
      imageURL: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      parent_feature_request_id: null,
      status_id: 1,
      user_id: 1,
      category_id: 1
    }], {});

  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('Feature_requests', null, {});
  }
};
