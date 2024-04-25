'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mebels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Mebels.init(
    {
      mebel_manufacturer: DataTypes.STRING,
      price: DataTypes.INTEGER,
      type: DataTypes.STRING,
      vendor_code: DataTypes.STRING,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      images: DataTypes.STRING,
      in_stock: DataTypes.INTEGER,
      bestseller: DataTypes.BOOLEAN,
      new: DataTypes.BOOLEAN,
      popularity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Mebels',
    },
  );
  return Mebels;
};
