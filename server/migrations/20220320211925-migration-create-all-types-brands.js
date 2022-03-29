'use strict';

const { Type, Brand, Device } = require('../models/index')

module.exports = {
  async up (queryInterface, Sequelize) {
    await Type.create({ name: 'Холодильники'}),
    await Type.create({ name: 'Телефоны'}),

    await Brand.create({ name: 'Samsung'}),
    await Brand.create({ name: 'Apple'})

    await Device.create({ name: 'Samsung1', price: 10000, BrandId:1, TypeId:1, img: '0ff851f4-27e7-48eb-a5a3-814af19fa6c4.jpg' })
    await Device.create({ name: 'Samsung2', price: 11000, BrandId:1, TypeId:1, img: '3b866d08-a930-44e1-9921-2b726b77c3dd.jpg' })
    await Device.create({ name: 'Apple1', price: 12000, BrandId:2, TypeId:2, img: '3ac8fb99-7fff-445d-a21d-a4424e08d974.jpg' })
    await Device.create({ name: 'Apple2', price: 14000, BrandId:2, TypeId:2, img: '6431697c-4ecb-4a05-adff-33cac72a30b7.jpg' })

  },

  async down (queryInterface, Sequelize) {

  }
};