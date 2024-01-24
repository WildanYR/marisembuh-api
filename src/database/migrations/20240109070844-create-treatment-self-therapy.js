'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('treatment_self_therapy', {
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
      self_therapy_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
      },
    });

    await queryInterface.addConstraint('treatment_self_therapy', {
      fields: ['treatment_id'],
      type: 'foreign key',
      name: 'fk_treatment_self_therapy',
      references: {
        table: 'treatment',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('treatment_self_therapy', {
      fields: ['self_therapy_id'],
      type: 'foreign key',
      name: 'fk_self_therapy_treatment',
      references: {
        table: 'self_therapy',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('treatment_self_therapy');
  },
};
