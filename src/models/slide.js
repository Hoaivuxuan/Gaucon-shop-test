'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Slide extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Slide.init({
    nameS: DataTypes.STRING,
    imageS: DataTypes.BLOB,
    content: DataTypes.STRING,
    timeUpdate: DataTypes.DATE,
    idP: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Slide',
    tableName:'slides',
    timestamps: false
  });
  return Slide;
};