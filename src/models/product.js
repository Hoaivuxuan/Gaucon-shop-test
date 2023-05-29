'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.DetailBill, {foreignKey: "id", as:"DataProduct", through: "BillAndProduct"});
      Product.belongsTo(models.ProductGroup, {foreignKey: "idGroup", as: "DataProductGroup"});
    }
  };
  Product.init({
    idGroup: DataTypes.INTEGER,
    nameP: DataTypes.STRING,
    priceP: DataTypes.INTEGER,
    countP: DataTypes.INTEGER,
    imageP: DataTypes.BLOB,
    infoP: DataTypes.STRING,
    parameterP: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
    tableName: "products",
    timestamps: false
  });
  return Product;
};