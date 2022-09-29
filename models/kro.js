'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Kro.belongsTo(models.Group)
      Kro.belongsTo(models.Kegiatan)
      Kro.hasMany(models.Ro)
      Kro.hasMany(models.Realisasi)
      Kro.hasMany(models.Komponen)
      Kro.hasMany(models.Budget)
      // define association here
    }
  }
  Kro.init({
    GroupId: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    KegiatanId: DataTypes.INTEGER,
    kroCode: DataTypes.STRING,
    kroDetail: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Kro',
  });
  return Kro;
};