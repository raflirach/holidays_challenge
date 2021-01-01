'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.belongsTo(models.Customer)
    }
  };
  Account.init({
    type: DataTypes.STRING,
    balance: {
      type: DataTypes.FLOAT,
      validate: {
        min: {
          args : 500000,
          msg: 'Minimum balance for new Accout: Rp500.000'
        }
      }
    },
    CustomerId: DataTypes.INTEGER,
    accountNumber: DataTypes.STRING,
  }, {
    hooks: {
      beforeCreate: (instance) => {
        instance.accountNumber = Math.random().toString().slice(2,12);
        if(!instance.balance) instance.balance = 500000
      },
    },
    sequelize,
    modelName: 'Account',
  });
  return Account;
};