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
    },
    {
      id: 1537979746,
      title: "Hamsters with tiny hats",
      description: "some description",
      imageURL: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      parent_feature_request_id: null,
      status_id: 2,
      user_id: 2,
      category_id: 2
    },
    {
      id: 1537979747,
      title: "Tiny boots on cute tiny fur balls aka hamsters",
      description: "some description",
      imageURL: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      parent_feature_request_id: null,
      status_id: 3,
      user_id: 3,
      category_id: 3
    }
  ], {});

  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('Feature_requests', null, {});
  }
};
