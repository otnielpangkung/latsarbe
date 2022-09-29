'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Komponen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Komponen.belongsTo(models.Group)
      Komponen.belongsTo(models.Kegiatan)
      Komponen.belongsTo(models.Kro)
      Komponen.belongsTo(models.Ro)
      Komponen.hasMany(models.Realisasi)
      Komponen.hasMany(models.Budget)
      // define association here
    }
  }
  Komponen.init({
    komponenCode: DataTypes.STRING,
    komponenDetail: DataTypes.STRING,
    KegiatanId: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    KroId: DataTypes.INTEGER,
    RoId: DataTypes.INTEGER,
    GroupId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Komponen',
  });
  return Komponen;
};