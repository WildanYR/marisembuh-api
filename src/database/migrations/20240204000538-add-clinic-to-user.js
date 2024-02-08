'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'user',
        'clinic_id',
        { type: Sequelize.BIGINT.UNSIGNED },
        { transaction },
      );
      await queryInterface.addConstraint(
        'user',
        {
          fields: ['clinic_id'],
          type: 'foreign key',
          name: 'fk_clinic_user',
          references: {
            table: 'clinic',
            field: 'id',
          },
          onDelete: 'CASCADE',
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
      await queryInterface.removeConstraint('user', 'fk_clinic_user', {
        transaction,
      });
      await queryInterface.removeColumn('user', 'clinic_id', { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
