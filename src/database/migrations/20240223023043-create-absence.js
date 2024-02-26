'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('absence', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      in_clinic_time: Sequelize.DATE,
      afterwork_time: Sequelize.DATE,
      absence_code: Sequelize.STRING,
      user_id: Sequelize.BIGINT.UNSIGNED,
      code_from: Sequelize.BIGINT.UNSIGNED,
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });

    await queryInterface.addConstraint('absence', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_absence_user',
      references: {
        table: 'user',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('absence', {
      fields: ['code_from'],
      type: 'foreign key',
      name: 'fk_absence_code_from',
      references: {
        table: 'user',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('absence');
  },
};
