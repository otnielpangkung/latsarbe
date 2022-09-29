'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Group.hasMany(models.User)
      Group.hasMany(models.Kro)
      Group.hasMany(models.Ro)
      Group.hasMany(models.Realisasi)
      Group.hasMany(models.Kegiatan)
      Group.hasMany(models.Komponen)
      Group.hasMany(models.Budget)
      // define association here
    }
  }
  Group.init({
    grupName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};