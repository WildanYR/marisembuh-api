'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'treatment',
        'user_id',
        {
          type: Sequelize.BIGINT.UNSIGNED,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'treatment',
        'clinic_id',
        {
          type: Sequelize.BIGINT.UNSIGNED,
        },
        { transaction },
      );
      await queryInterface.addConstraint(
        'treatment',
        {
          fields: ['user_id'],
          type: 'foreign key',
          name: 'fk_treatment_user',
          references: {
            table: 'user',
            field: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        { transaction },
      );
      await queryInterface.addConstraint(
        'treatment',
        {
          fields: ['clinic_id'],
          type: 'foreign key',
          name: 'fk_treatment_clinic',
          references: {
            table: 'clinic',
            field: 'id',
          },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        },
        { transaction },
      );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeConstraint(
        'treatment',
        'fk_treatment_clinic',
        { transaction },
      );
      await queryInterface.removeColumn('treatment', 'clinic_id', {
        transaction,
      });
      await queryInterface.removeConstraint('treatment', 'fk_treatment_user', {
        transaction,
      });
      await queryInterface.removeColumn('treatment', 'user_id', {
        transaction,
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
