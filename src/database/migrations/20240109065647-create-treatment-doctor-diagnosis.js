'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('treatment_doctor_diagnosis', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      treatment_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
      },
      doctor_diagnosis_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
      },
    });

    await queryInterface.addConstraint('treatment_doctor_diagnosis', {
      fields: ['treatment_id'],
      type: 'foreign key',
      name: 'fk_treatment_doctor_diagnosis',
      references: {
        table: 'treatment',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('treatment_doctor_diagnosis', {
      fields: ['doctor_diagnosis_id'],
      type: 'foreign key',
      name: 'fk_doctor_diagnosis_treatment',
      references: {
        table: 'doctor_diagnosis',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('treatment_doctor_diagnosis');
  },
};
