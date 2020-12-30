'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const data = [
     {
       identityNumber : '3200123219400001',
       fullName : 'Rafli Rachmawandi',
       address : 'Cipicung Bandung',
       birthDate : '06-03-1995',
       gender : 'male'
     },
     {
      identityNumber : '3200145938400001',
      fullName : 'Ranti Deranti',
      address : 'Cibitung Bekasi',
      birthDate : '23-01-1993',
      gender : 'female'
     },
   ]
   data.forEach(e => {
     e.createdAt = new Date(),
     e.updatedAt = new Date()
   })
   return queryInterface.bulkInsert('Customers', data, {})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Customers', null, {});
  }
};
