'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductGroup.hasMany(models.Product, {foreignKey: "idGroup", as: "DataProductGroup"});
    }
  };
  ProductGroup.init({
    idGroup: DataTypes.INTEGER,
    nameGroup: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductGroup',
  });
  return ProductGroup;
};