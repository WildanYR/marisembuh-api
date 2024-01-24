'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('treatment_pulse_checkup', {
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
      depth: {
        type: Sequelize.STRING,
      },
      speed: {
        type: Sequelize.STRING,
      },
      power: {
        type: Sequelize.STRING,
      },
      abnormal_type: {
        type: Sequelize.STRING,
      },
      location_differentiation: {
        type: Sequelize.STRING,
      },
    });

    await queryInterface.addConstraint('treatment_pulse_checkup', {
      fields: ['treatment_id'],
      type: 'foreign key',
      name: 'fk_treatment_pulse_checkup',
      references: {
        table: 'treatment',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('treatment_pulse_checkup');
  },
};
