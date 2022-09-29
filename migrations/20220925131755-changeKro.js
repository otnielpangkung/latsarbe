'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.renameColumn('Realisasis', 'KorId', 'KroId');

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
