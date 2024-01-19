'use strict';

const therapy = [
  'Akupuntur',
  'Akupuntur YNSA',
  'Akupuntur Manaka Organ',
  'Akupuntur TANS Balance',
  'Akupuntur Fuke',
  'Akupuntur Zhu Scalp',
  'Akupuntur Lokal',
  'Electro Akupuntur',
  'Bekam',
  'Bekam Titik Kolesterol & Asam Urat',
  'Bekam Titik Stroke & Hipertensi',
  'Bekam Titik Organ Dalam',
  'Bekam Titik Detoksifikasi',
  'Bekam Titik Sunnah',
  'Bekam Titik Gatal & Eksim',
  'Moksa',
  'Moksa Perut',
  'Moksa Okyu',
  'Moksa Batang',
  'Bloodletting',
  'Bloodletting Jing wel',
  'Bloodletting Apex Telinga',
  'Bloodletting Spider Nevi',
  'Bloodletting Tung (Bekam Meridian)',
  'Bloodletting Fasdhu',
  'Infrared / TDP',
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'therapy',
      therapy.map((item) => ({ name: item })),
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('therapy', {
      name: { [Sequelize.Op.or]: therapy },
    });
  },
};
