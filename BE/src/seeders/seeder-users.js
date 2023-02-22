'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      email: 'vuxuanhoai28@gmail.com',
      password: 123456,
      firstName: 'Vu Xuan',
      lastName: 'Hoai',
      address: 'VN',
      gender: 1,
      typeRole: 'ROLE',
      keyRole: 'R1',
      // 
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
