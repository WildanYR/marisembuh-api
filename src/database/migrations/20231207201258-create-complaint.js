'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('complaint', {
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
      meridian_id: {
        type: Sequelize.BIGINT.UNSIGNED,
      },
    });

    await queryInterface.addConstraint('complaint', {
      fields: ['meridian_id'],
      type: 'foreign key',
      name: 'fk_complaint_meridian',
      references: {
        table: 'meridian',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('complaint');
  },
};
