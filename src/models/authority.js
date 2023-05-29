"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Authority extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Authority.hasMany(models.User, {
        foreignKey: "roleId",
        as: "DataAuth",
      });
    }
  }
  Authority.init(
    {
      nameAuth: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Authority",
      tableName: "authorities",
    }
  );
  return Authority;
};
