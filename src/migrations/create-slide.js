'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('slides', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idP: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      nameS: {
        allowNull: false,
        type: Sequelize.STRING
      },
      imageS: {
        allowNull: false,
        type: Sequelize.BLOB,
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      timeUpdate: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('slides');
  }
};