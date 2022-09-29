'use strict';
const fs = require('fs')
let data  = fs.readFileSync("./data/Kro.csv", {encoding: 'utf8'})

let hasil = data.split("\r\n").slice(1, -1)
let  penm = hasil.map(e => {
    let penm2 = e.split(",")
    return {
        id: +penm2[0],
        year: +penm2[1],
        KegiatanId: +penm2[2],
        GroupId: penm2[3],
        kroCode: penm2[4],
        kroDetail: penm2[5],
        createdAt: new Date(),
        updatedAt: new Date(),
    }
})
module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.bulkInsert('Kros',penm, {});

  },

  async down (queryInterface, Sequelize) {
    

      await queryInterface.bulkDelete('Kros', null, {});
     
  }
};
