'use strict';

const meridian = [
  { name: 'Sistem Hati/Kandung Empedu' },
  { name: 'Sistem Jantung/Usus Halus' },
  { name: 'Sistem Limpa/Lambung' },
  { name: 'Sistem Paru-paru/Usus Besar' },
  { name: 'Sistem Ginjal/Kandung Kemih' },
];
const complaint = [
  [
    { name: 'Sakit kepala', meridian_id: null },
    { name: 'Nyeri hipokondrium', meridian_id: null },
    { name: 'Gangguan penglihatan', meridian_id: null },
    { name: 'Tremor tungkai', meridian_id: null },
    { name: 'Gelisah', meridian_id: null },
    { name: 'Kram otot', meridian_id: null },
    { name: 'Mudah marah', meridian_id: null },
    { name: 'Gangguan menstruasi', meridian_id: null },
    { name: 'Kejang', meridian_id: null },
    { name: 'Pusing berputar', meridian_id: null },
  ],
  [
    { name: 'Berdebar', meridian_id: null },
    { name: 'Tidur terganggu mimpi', meridian_id: null },
    { name: 'Tidak bersemangat', meridian_id: null },
    { name: 'Gangguan kesadaran', meridian_id: null },
    { name: 'Nyeri dada', meridian_id: null },
    { name: 'Pelupa', meridian_id: null },
    { name: 'Dada tertekan', meridian_id: null },
    { name: 'Gangguan konsentrasi', meridian_id: null },
    { name: 'Pingsan', meridian_id: null },
    { name: 'Gangguan mental', meridian_id: null },
    { name: 'Sulit tidur', meridian_id: null },
    { name: 'Gelisah', meridian_id: null },
  ],
  [
    { name: 'Tidak nafsu makan', meridian_id: null },
    { name: 'Kegemukan', meridian_id: null },
    { name: 'Perut terasa penuh', meridian_id: null },
    { name: 'Nyeri ulu hati', meridian_id: null },
    { name: 'Mual', meridian_id: null },
    { name: 'Badan lemah', meridian_id: null },
    { name: 'Muntah', meridian_id: null },
    { name: 'Kelemahan otot', meridian_id: null },
    { name: 'Cegukan', meridian_id: null },
    { name: 'Kembung', meridian_id: null },
  ],
  [
    { name: 'Batuk', meridian_id: null },
    { name: 'Gangguan suara', meridian_id: null },
    { name: 'Sesak napas', meridian_id: null },
    { name: 'Gangguan BAK', meridian_id: null },
    { name: 'Mengi', meridian_id: null },
    { name: 'Diare', meridian_id: null },
    { name: 'Nafas lemah', meridian_id: null },
    { name: 'Konstipasi', meridian_id: null },
    { name: 'Pilek', meridian_id: null },
    { name: 'Nyeri dan panas di anus', meridian_id: null },
    { name: 'Gangguan bicara', meridian_id: null },
    { name: 'Gatal/alergi', meridian_id: null },
    { name: 'Biduran', meridian_id: null },
    { name: 'Jerawat', meridian_id: null },
  ],
  [
    { name: 'Gangguan tumbuh kembang', meridian_id: null },
    { name: 'Rambut rontok', meridian_id: null },
    { name: 'Gangguan fungsi seksual', meridian_id: null },
    { name: 'Sulit BAK', meridian_id: null },
    { name: 'Gangguan reproduksi', meridian_id: null },
    { name: 'Enuresis', meridian_id: null },
    { name: 'Penurunan pendengaran', meridian_id: null },
    { name: 'Sering BAK', meridian_id: null },
    { name: 'Telinga berdenging', meridian_id: null },
    { name: 'Penurunan daya ingat', meridian_id: null },
    { name: 'Nyeri dan lemah area lumbal', meridian_id: null },
    { name: 'Nyeri pinggang', meridian_id: null },
    { name: 'Nyeri lutut', meridian_id: null },
  ],
  [
    { name: 'Gangguan gerak', meridian_id: null },
    { name: 'Kelelahan, letih, lesu', meridian_id: null },
    { name: 'Lumpuh', meridian_id: null },
    { name: 'Sering merasa ngantuk', meridian_id: null },
    { name: 'Kesemutan', meridian_id: null },
    { name: 'Pucat', meridian_id: null },
    { name: 'Tremor', meridian_id: null },
    { name: 'Pusing', meridian_id: null },
    { name: 'Nyeri otot', meridian_id: null },
    { name: 'Tekanan darah tinggi', meridian_id: null },
    { name: 'Kekakuan otot', meridian_id: null },
    { name: 'Tekanan darah rendah', meridian_id: null },
    { name: 'Kelemahan otot', meridian_id: null },
    { name: 'Impoten', meridian_id: null },
    { name: 'Atrofi otot', meridian_id: null },
    { name: 'Nyeri tenggorokan', meridian_id: null },
    { name: 'Gangguan persendian', meridian_id: null },
    { name: 'Bengkak', meridian_id: null },
    { name: 'Lumpuh wajah', meridian_id: null },
    { name: 'Kandungan lemah', meridian_id: null },
  ],
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkInsert('meridian', meridian, { transaction });

      // eslint-disable-next-line
      const [newMeridians, _] = await queryInterface.sequelize.query(
        `SELECT id FROM meridian ORDER BY id DESC limit ${meridian.length}`,
        { transaction },
      );

      const newMeridianIds = newMeridians.map((item) => item.id).reverse();
      const complaintData = [];

      for (let i = 0; i < complaint.length; i++) {
        const meridianId = newMeridianIds[i];
        for (let j = 0; j < complaint[i].length; j++) {
          if (meridianId) {
            complaint[i][j].meridian_id = meridianId;
          }
          complaintData.push(complaint[i][j]);
        }
      }

      await queryInterface.bulkInsert('complaint', complaintData, {
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      console.log(error);
      await transaction.rollback();
    }
  },

  async down(queryInterface, Sequelize) {
    const meridianNames = meridian.map((item) => item.name);
    const complaintNames = [];

    for (let i = 0; i < complaint.length; i++) {
      for (let j = 0; j < complaint[i]; j++) {
        complaintNames.push(complaint[i][j].name);
      }
    }

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkDelete(
        'meridian',
        {
          name: { [Sequelize.Op.or]: meridianNames },
        },
        { transaction },
      );
      await queryInterface.bulkDelete(
        'complaint',
        {
          name: { [Sequelize.Op.or]: complaintNames },
        },
        { transaction },
      );

      await transaction.commit();
    } catch (error) {
      console.log(error);
      await transaction.rollback();
    }
  },
};
