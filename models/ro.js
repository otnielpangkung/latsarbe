'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ro.belongsTo(models.Group)
      Ro.belongsTo(models.Kegiatan)
      Ro.belongsTo(models.Kro)
      Ro.hasMany(models.Realisasi)
      Ro.hasMany(models.Komponen)
      Ro.hasMany(models.Budget)
      // define association here
    }
  }
  Ro.init({
    GroupId: DataTypes.INTEGER,
    KegiatanId: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    roCode: DataTypes.STRING,
    roDetail: DataTypes.TEXT,
    KroId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ro',
  });
  return Ro;
};