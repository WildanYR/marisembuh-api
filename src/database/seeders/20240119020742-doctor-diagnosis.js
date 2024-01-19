'use strict';

const doctorDiagnosis = [
  'Stroke',
  'Jantung',
  'Asam Lambung',
  'Diabetes',
  'Darah Tinggi / Asam Urat / Kolesterol',
  'Kanker',
  'PPOK & Asma',
  'PCOS',
  'Ginjal',
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'doctor_diagnosis',
      doctorDiagnosis.map((item) => ({ name: item })),
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('doctor_diagnosis', {
      name: { [Sequelize.Op.or]: doctorDiagnosis },
    });
  },
};
