'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Realisasi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Realisasi.belongsTo(models.Group)
      Realisasi.belongsTo(models.Kegiatan)
      Realisasi.belongsTo(models.Kro)
      Realisasi.belongsTo(models.Ro)
      Realisasi.belongsTo(models.Komponen)
      Realisasi.belongsTo(models.Account )
      // define association here
    }
  }
  Realisasi.init({
    noDokumen: DataTypes.STRING,
    keterangan: DataTypes.TEXT,
    GroupId: DataTypes.INTEGER,
    KroId: DataTypes.INTEGER,
    RoId: DataTypes.INTEGER,
    KegiatanId: DataTypes.INTEGER,
    KomponenId: DataTypes.INTEGER,
    AccountId: DataTypes.INTEGER,
    dateTransaction: DataTypes.DATE,
    sifatPembayaran: DataTypes.STRING,
    manualAccount: DataTypes.STRING,
    jenisPembayaran: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    pagu: DataTypes.BIGINT,
    amount: DataTypes.BIGINT,
    balancePagu: DataTypes.BIGINT,
    
    suratTugas: DataTypes.BOOLEAN,
    daftarNominatif: DataTypes.BOOLEAN,
    copySurat: DataTypes.BOOLEAN,
    kwuitansi: DataTypes.BOOLEAN,
    dpr: DataTypes.BOOLEAN,

    spd: DataTypes.BOOLEAN,
    absen: DataTypes.BOOLEAN,
    tiket: DataTypes.BOOLEAN,
    hotel: DataTypes.BOOLEAN,
    lainnya: DataTypes.BOOLEAN,
    
    ttd: DataTypes.BOOLEAN,
    invoice: DataTypes.BOOLEAN,
    kwuitansiPembayaran: DataTypes.BOOLEAN,
    stempel: DataTypes.BOOLEAN,
    fakturPajak: DataTypes.BOOLEAN,
    ssp: DataTypes.BOOLEAN,
    ttdPetugas: DataTypes.BOOLEAN,
    suratPenawaran: DataTypes.BOOLEAN,
    spk: DataTypes.BOOLEAN,
    bast: DataTypes.BOOLEAN,
    bap: DataTypes.BOOLEAN,
    sk: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Realisasi',
  });
  return Realisasi;
};