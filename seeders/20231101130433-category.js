'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Categories', [
      {
        category:'All Categories',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category:'Dashboard Feartures',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category:'Documentaion',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category:'Blling Features',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category:'Networking',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category:'Hardware and products',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category:'Perfect Server Stacks',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category:'Mobile App',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category:'Webdock API',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category:'Competition',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
