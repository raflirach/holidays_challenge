'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Account)
    }
  };
  Customer.init({
    identityNumber: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Identity Number must be filled"
        },
        len: {
          args : [16,20],
          msg: "Identity Number minimum 16 characters and maximum 20 characters"
        },
        isDuplicate(value, next) {
          Customer.findOne({where: {identityNumber: value}})
          .then( data => {
            if(data) next(new Error('Duplicate Identity Number'))
            else next()
          })
        }
      }
    },
    fullName: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Full Name must be filled"
        },
      }
    },
    address: DataTypes.STRING,
    birthDate: {
      type:DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Birth Date must be filled"
        },
      }
    },
    gender: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};