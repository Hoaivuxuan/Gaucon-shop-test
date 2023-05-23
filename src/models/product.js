"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {}
  }
  Product.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      roleId: DataTypes.STRING,
      phonenumber: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
