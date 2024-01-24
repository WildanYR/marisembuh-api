'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('treatment_medicine', {
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
      medicine_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
      },
    });

    await queryInterface.addConstraint('treatment_medicine', {
      fields: ['treatment_id'],
      type: 'foreign key',
      name: 'fk_treatment_medicine',
      references: {
        table: 'treatment',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('treatment_medicine', {
      fields: ['medicine_id'],
      type: 'foreign key',
      name: 'fk_medicine_treatment',
      references: {
        table: 'medicine',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('treatment_medicine');
  },
};
