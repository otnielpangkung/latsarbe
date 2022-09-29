'use strict';
const fs = require('fs')
let data  = fs.readFileSync("./data/Kegiatan.csv", {encoding: 'utf8'})

let hasil = data.split("\r\n").slice(1, -1)
let  penm = hasil.map(e => {
    let penm2 = e.split(",")
    return {
        id: +penm2[0],
        GroupId: penm2[1],
        year: +penm2[2],
        kegiatanCode: penm2[3],
        kegiatanDetail: penm2[4],
        createdAt: new Date(),
        updatedAt: new Date(),
    }
})
module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.bulkInsert('Kegiatans',penm, {});

  },

  async down (queryInterface, Sequelize) {
    

      await queryInterface.bulkDelete('Kegiatans', null, {});
     
  }
};
