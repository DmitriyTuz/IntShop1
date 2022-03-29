'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Brand.hasMany(models.Device, { onDelete: "cascade" })
//      Brand.belongsToMany(models.Type, { through: models.TypeBrand })
      Brand.belongsToMany(models.Type, { through: 'Type_Brands' })
    }
  }
  Brand.init({

    name: {type: DataTypes.STRING, unique: true, allowNull: false}

//    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Brand',
  });
  return Brand;
};