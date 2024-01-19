'use strict';

// eslint-disable-next-line
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const password = process.env.USER_ADMIN_PWD;
    if (!password) return;
    const hashPassword = await bcrypt.hash(password, 10);
    await queryInterface.bulkInsert('user', [
      {
        email: 'admin@marisembuh.com',
        password: hashPassword,
        name: 'SuperAdmin Marisembuh',
        role: 'ADMIN',
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('user', { email: 'admin@marisembuh.com' });
  },
};
