'use strict';

const { bcryptPass } = require("../helper/bcrypt");

module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.bulkInsert('Users', [
        {
          username: 'admin',
          role: "admin",
          password: bcryptPass("admin"),
          GroupId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }, 
        {
          username: 'op_otniel',
          role: "operator",
          password: bcryptPass("admin"),
          GroupId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }, 
        {
          username: 'op_hilmy',
          role: "operator",
          password: bcryptPass("admin"),
          GroupId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }, 
        {
          username: 'staff_tatausaha',
          role: "staff",
          password: bcryptPass("admin"),
          GroupId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }, 
        {
          username: 'staff_penindakan',
          role: "staff",
          password: bcryptPass("admin"),
          GroupId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        }, 
        
      ], {});

  },

  async down (queryInterface, Sequelize) {
    

      await queryInterface.bulkDelete('Users', null, {});
     
  }
};
