'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idGroup: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      nameP: {
        allowNull: false,
        type: Sequelize.STRING
      },
      priceP: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      countP: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      imageP: {
        allowNull: false,
        type: Sequelize.BLOB,
      },
      infoP: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      parameterP: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  }
};