'use strict';

const stomachCheckup = [
  'Defisiensi Organ Limpa',
  'Defisiensi Organ Paru',
  'Defisiensi Organ Ginjal',
  'Defisiensi Organ Liver',
  'Defisiensi Organ Jantung',
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'stomach_checkup',
      stomachCheckup.map((item) => ({ name: item })),
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('stomach_checkup', {
      name: { [Sequelize.Op.or]: stomachCheckup },
    });
  },
};
