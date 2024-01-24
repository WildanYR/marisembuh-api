'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('treatment', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      objective: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      blood_pressure: {
        type: Sequelize.STRING,
      },
      pulse_frequency: {
        type: Sequelize.STRING,
      },
      is_pregnant: {
        type: Sequelize.STRING,
      },
      evaluation: {
        type: Sequelize.TEXT('long'),
      },
      patient_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
      },
      duration_advice_id: {
        type: Sequelize.BIGINT.UNSIGNED,
      },
      treatment_packet_id: {
        type: Sequelize.BIGINT.UNSIGNED,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.addConstraint('treatment', {
      fields: ['patient_id'],
      type: 'foreign key',
      name: 'fk_treatment_patient',
      references: {
        table: 'patient',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('treatment', {
      fields: ['duration_advice_id'],
      type: 'foreign key',
      name: 'fk_treatment_duration_advice',
      references: {
        table: 'duration_advice',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('treatment', {
      fields: ['treatment_packet_id'],
      type: 'foreign key',
      name: 'fk_treatment_treatment_packet',
      references: {
        table: 'treatment_packet',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('treatment');
  },
};
