'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('treatment_therapy_history', {
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
      therapy_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
      },
    });

    await queryInterface.addConstraint('treatment_therapy_history', {
      fields: ['treatment_id'],
      type: 'foreign key',
      name: 'fk_treatment_therapy_history',
      references: {
        table: 'treatment',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('treatment_therapy_history', {
      fields: ['therapy_id'],
      type: 'foreign key',
      name: 'fk_therapy_history_treatment',
      references: {
        table: 'therapy',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('treatment_therapy_history');
  },
};
