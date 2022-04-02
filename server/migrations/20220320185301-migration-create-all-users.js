'use strict';

const { User } = require('../models/index')

const userM = require('../models-mongo/userM')

module.exports = {
  async up (queryInterface, Sequelize) {

/*    await User.create({ name: 'Dima', email: 'dim@mail.ru', password: '111'});
    await User.create({ name: 'Alexey', email: 'al@mail.ru', password: '222'});*/

    let user = await userM.find();

    console.log('***user = ', user);
    console.log('***user = ', user[0].name);
    console.log('***userLength = ', user.length);

    for ( let i = 0; i <= user.length - 1; i++ ) {
      await User.create({ name: user[i].name, email: user[i].email } );

    }
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
