'use strict';

const selfTherapy = [
  'Moksa perut rutin',
  'Mandi Air Hangat',
  'Diet Karbo (Interminten Fasting)',
  'Makan-Makanan Mentah (antitoxic)',
  'Makan-Makanan Panas',
  'Makan-Makanan Dingin',
  'Perbanyak Minum Air Putih',
  'Menejemen Stress',
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'self_therapy',
      selfTherapy.map((item) => ({ name: item })),
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('self_therapy', {
      name: { [Sequelize.Op.or]: selfTherapy },
    });
  },
};
