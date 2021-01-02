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
    balance:DataTypes.FLOAT,
    CustomerId: DataTypes.INTEGER,
    accountNumber: DataTypes.STRING,
  }, {
    hooks: {
      beforeCreate: (instance) => {
        instance.accountNumber = Math.random().toString().slice(2,12);
        if(!instance.balance) instance.balance = 500000
        if(instance.balance<500000) return Promise.reject({errors:{message:'eb=Minimum balance for new Accout: Rp500.000'}});
      },
      beforeUpdate: (instance) => {
        if(instance.balance<0) return Promise.reject({errors:{message:'eb=Insufficient balance'}});
      }
    },
    sequelize,
    modelName: 'Account',
  });
  return Account;
};

