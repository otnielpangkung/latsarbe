'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Budget extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Budget.belongsTo(models.Group)
      Budget.belongsTo(models.Kegiatan)
      Budget.belongsTo(models.Kro)
      Budget.belongsTo(models.Ro)
      Budget.belongsTo(models.Komponen)
      Budget.belongsTo(models.Account )
      // define association here
    }
  }
  Budget.init({
    KomponenId: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    KroId: DataTypes.INTEGER,
    RoId: DataTypes.INTEGER,
    GroupId: DataTypes.INTEGER,
    AccountId: DataTypes.INTEGER,
    KegiatanId: DataTypes.INTEGER,
    month: DataTypes.INTEGER,
    week: DataTypes.INTEGER,
    amount: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Budget',
  });
  return Budget;
};