'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kegiatan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Kegiatan.belongsTo(models.Group)
      Kegiatan.hasMany(models.Kro)
      Kegiatan.hasMany(models.Ro)
      Kegiatan.hasMany(models.Realisasi)
      Kegiatan.hasMany(models.Komponen)
      Kegiatan.hasMany(models.Budget)
      // define association here
    }
  }
  Kegiatan.init({
    kegiatanCode: DataTypes.STRING,
    kegiatanDetail: DataTypes.STRING,
    GroupId: DataTypes.INTEGER,
    year: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Kegiatan',
    // as: 
  });
  return Kegiatan;
};