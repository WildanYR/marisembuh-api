'use strict';

const durationAdvice = [
  '2 x Dalam 1 minggu',
  '1 x Dalam 1 minggu',
  '1 x Dalam 2 Minggu',
  '1 x Dalam 1 Bulan',
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'duration_advice',
      durationAdvice.map((item) => ({ name: item })),
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('duration_advice', {
      name: { [Sequelize.Op.or]: durationAdvice },
    });
  },
};
