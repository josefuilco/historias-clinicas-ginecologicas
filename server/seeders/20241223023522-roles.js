'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        name: 'Admin'
      },
      {
        name: 'User'
      }
    ]);
  },

  async down (_queryInterface, _Sequelize) {}
};
