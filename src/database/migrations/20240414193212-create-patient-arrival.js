'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('patient_arrival', {
        id: {
          type: Sequelize.BIGINT.UNSIGNED,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        done: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        patient_id: {
          type: Sequelize.BIGINT.UNSIGNED,
          allowNull: false,
        },
        user_id: {
          type: Sequelize.BIGINT.UNSIGNED,
          allowNull: false,
        },
        tag_user_id: {
          type: Sequelize.BIGINT.UNSIGNED,
        },
        created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        updated_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
      });

      await queryInterface.addConstraint('patient_arrival', {
        fields: ['patient_id'],
        type: 'foreign key',
        name: 'fk_patient_arrival_patient',
        references: {
          table: 'patient',
          field: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      await queryInterface.addConstraint('patient_arrival', {
        fields: ['user_id'],
        type: 'foreign key',
        name: 'fk_patient_arrival_user',
        references: {
          table: 'user',
          field: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      await queryInterface.addConstraint('patient_arrival', {
        fields: ['tag_user_id'],
        type: 'foreign key',
        name: 'fk_patient_arrival_tag_user',
        references: {
          table: 'user',
          field: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
    } catch (error) {
      await queryInterface.dropTable('patient_arrival');
      throw error;
    }
  },

  async down(queryInterface) {
    await queryInterface.dropTable('patient_arrival');
  },
};
