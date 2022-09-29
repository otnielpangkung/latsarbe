'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Realisasis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      noDokumen: {
        type: Sequelize.STRING, unique:true,    allowNull: false,
      },
      keterangan: {
        type: Sequelize.TEXT
      },
      GroupId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      KroId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      KegiatanId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      KomponenId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      RoId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      dateTransaction: {
        allowNull: false,
        type: Sequelize.DATE
      },
      sifatPembayaran: {
        allowNull: false,
        type: Sequelize.STRING
      },
      manualAccount: {
        type: Sequelize.STRING
      },
      UserId: { type: Sequelize.INTEGER, allowNull: false},
      jenisPembayaran: {
        allowNull: false,
        type: Sequelize.STRING
      },
      pagu: {
        type: Sequelize.BIGINT
      },
      amount: {
        type: Sequelize.BIGINT
      },
      balancePagu: {
        type: Sequelize.BIGINT
      },
      suratTugas: {type: Sequelize.BOOLEAN, defaultValue: false},
      daftarNominatif: {type: Sequelize.BOOLEAN, defaultValue: false},
      copySurat: {type: Sequelize.BOOLEAN, defaultValue: false},
      kwuitansi: {type: Sequelize.BOOLEAN, defaultValue: false},
      dpr: {type: Sequelize.BOOLEAN, defaultValue: false},
      spd: {type: Sequelize.BOOLEAN, defaultValue: false},
      absen: {type: Sequelize.BOOLEAN, defaultValue: false},
      tiket: {type: Sequelize.BOOLEAN, defaultValue: false},
      hotel: {type: Sequelize.BOOLEAN, defaultValue: false},
      lainnya: {type: Sequelize.BOOLEAN, defaultValue: false},
      ttd: {type: Sequelize.BOOLEAN, defaultValue: false},
      
      invoice: {type: Sequelize.BOOLEAN, defaultValue: false},
      kwuitansiPembayaran: {type: Sequelize.BOOLEAN, defaultValue: false},
      stempel: {type: Sequelize.BOOLEAN, defaultValue: false},
      fakturPajak: {type: Sequelize.BOOLEAN, defaultValue: false},
      ssp: {type: Sequelize.BOOLEAN, defaultValue: false},
      ttdPetugas: {type: Sequelize.BOOLEAN, defaultValue: false},
      suratPenawaran: {type: Sequelize.BOOLEAN, defaultValue: false},
      spk: {type: Sequelize.BOOLEAN, defaultValue: false},
      bast: {type: Sequelize.BOOLEAN, defaultValue: false},
      bap: {type: Sequelize.BOOLEAN, defaultValue: false},
      sk: {type: Sequelize.BOOLEAN, defaultValue: false},
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Realisasis');
  }
};