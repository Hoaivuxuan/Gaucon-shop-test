'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetailBill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DetailBill.belongsTo(models.Bill, {foreignKey: "idBill", as: "DataBill"});
      DetailBill.belongsToMany(models.Product, {foreignKey: "idP", as:"DataProduct", through: "BillAndProduct"});
    }
  };
  DetailBill.init({
    idBill: DataTypes.INTEGER,
    idP: DataTypes.INTEGER,
    quantityP: DataTypes.INTEGER,
    totalCost: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DetailBill',
  });
  return DetailBill;
};