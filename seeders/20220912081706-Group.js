'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.bulkInsert('Groups', [
        {
          id: 1,
          grupName: 'Tata Usaha',
          createdAt: new Date(),
          updatedAt: new Date()
        }, 
        {
          id: 2,
          grupName: 'Penindakan',
          createdAt: new Date(),
          updatedAt: new Date()
        }, 
        {
          id: 3,
          grupName: 'Pemeriksaan',
          createdAt: new Date(),
          updatedAt: new Date()
        }, 
        {
          id: 4,
          grupName: 'Infokom',
          createdAt: new Date(),
          updatedAt: new Date()
        }, 
        {
          id: 5,
          grupName: 'Pengujian',
          createdAt: new Date(),
          updatedAt: new Date()
        }, 
      ], {});

  },

  async down (queryInterface, Sequelize) {
    

      await queryInterface.bulkDelete('Groups', null, {});
     
  }
};
