'use strict';

const clinic = [
  'Mari Sembuh Monjali',
  'Mari Sembuh Sonosewu',
  'Mari Sembuh Ganjuran',
  'Mari Sembuh Janti',
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'clinic',
      clinic.map((item) => ({ name: item })),
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('clinic', {
      name: { [Sequelize.Op.or]: clinic },
    });
  },
};
