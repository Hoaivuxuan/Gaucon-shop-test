'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bills', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idAcc: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      nameCustomer: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      dateBill: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      totalMoney: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      methodPay: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      noteBill: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      statusBill: {
        allowNull: false,
        type: Sequelize.STRING,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('bills');
  }
};