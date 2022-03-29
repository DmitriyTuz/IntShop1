'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Basket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Basket.hasMany(models.BasketDevice, { onDelete: "cascade" })
      Basket.belongsTo(models.User)
    }
  }
  Basket.init({
    
  }, {
    sequelize,
    modelName: 'Basket',
  });
  return Basket;
};