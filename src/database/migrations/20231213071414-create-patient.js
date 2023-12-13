'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('patient', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gender: {
        type: Sequelize.ENUM('L', 'P'),
        allowNull: false,
      },
      birthdate: Sequelize.DATEONLY,
      address: Sequelize.STRING,
      telp: Sequelize.STRING,
      created_at: Sequelize.DATE,
      user_id: Sequelize.BIGINT.UNSIGNED,
      clinic_id: Sequelize.BIGINT.UNSIGNED,
    });

    await queryInterface.addConstraint('patient', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_patient_user',
      references: {
        table: 'user',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('patient', {
      fields: ['clinic_id'],
      type: 'foreign key',
      name: 'fk_patient_clinic',
      references: {
        table: 'clinic',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('patient');
  },
};
