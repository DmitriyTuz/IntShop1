'use strict';

const { User } = require('../models/index')

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.create({ name: 'Dima', email: 'dim@mail.ru', password: '111'}),
    await User.create({ name: 'Alexey', email: 'al@mail.ru', password: '222'})

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
