'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('treatment_tongue_checkup', {
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
      tongue_checkup_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
      },
    });

    await queryInterface.addConstraint('treatment_tongue_checkup', {
      fields: ['treatment_id'],
      type: 'foreign key',
      name: 'fk_treatment_tongue_checkup',
      references: {
        table: 'treatment',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('treatment_tongue_checkup', {
      fields: ['tongue_checkup_id'],
      type: 'foreign key',
      name: 'fk_tongue_checkup_treatment',
      references: {
        table: 'tongue_checkup',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('treatment_tongue_checkup');
  },
};
