'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const date = new Date();
    const dateStr = date
      .toLocaleDateString('id-id')
      .split('/')
      .reverse()
      .join('-');
    const timeStr = date.toLocaleTimeString('id-id').replaceAll('.', ':');
    const dateNow = `${dateStr} ${timeStr}`;
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // user table
      await queryInterface.addColumn(
        'user',
        'created_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'user',
        'updated_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE user SET created_at='${dateNow}' WHERE created_at IS NULL`,
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE user SET updated_at='${dateNow}' WHERE updated_at IS NULL`,
        { transaction },
      );
      // clinic table
      await queryInterface.addColumn(
        'clinic',
        'created_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'clinic',
        'updated_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE clinic SET created_at='${dateNow}' WHERE created_at IS NULL`,
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE clinic SET updated_at='${dateNow}' WHERE updated_at IS NULL`,
        { transaction },
      );
      // medicine table
      await queryInterface.addColumn(
        'medicine',
        'created_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'medicine',
        'updated_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE medicine SET created_at='${dateNow}' WHERE created_at IS NULL`,
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE medicine SET updated_at='${dateNow}' WHERE updated_at IS NULL`,
        { transaction },
      );
      // doctor_diagnosis table
      await queryInterface.addColumn(
        'doctor_diagnosis',
        'created_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'doctor_diagnosis',
        'updated_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE doctor_diagnosis SET created_at='${dateNow}' WHERE created_at IS NULL`,
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE doctor_diagnosis SET updated_at='${dateNow}' WHERE updated_at IS NULL`,
        { transaction },
      );
      // self_therapy table
      await queryInterface.addColumn(
        'self_therapy',
        'created_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'self_therapy',
        'updated_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE self_therapy SET created_at='${dateNow}' WHERE created_at IS NULL`,
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE self_therapy SET updated_at='${dateNow}' WHERE updated_at IS NULL`,
        { transaction },
      );
      // treatment_packet table
      await queryInterface.addColumn(
        'treatment_packet',
        'created_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'treatment_packet',
        'updated_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE treatment_packet SET created_at='${dateNow}' WHERE created_at IS NULL`,
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE treatment_packet SET updated_at='${dateNow}' WHERE updated_at IS NULL`,
        { transaction },
      );
      // therapy table
      await queryInterface.addColumn(
        'therapy',
        'created_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'therapy',
        'updated_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE therapy SET created_at='${dateNow}' WHERE created_at IS NULL`,
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE therapy SET updated_at='${dateNow}' WHERE updated_at IS NULL`,
        { transaction },
      );
      // meridian table
      await queryInterface.addColumn(
        'meridian',
        'created_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'meridian',
        'updated_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE meridian SET created_at='${dateNow}' WHERE created_at IS NULL`,
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE meridian SET updated_at='${dateNow}' WHERE updated_at IS NULL`,
        { transaction },
      );
      // complaint table
      await queryInterface.addColumn(
        'complaint',
        'created_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'complaint',
        'updated_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE complaint SET created_at='${dateNow}' WHERE created_at IS NULL`,
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE complaint SET updated_at='${dateNow}' WHERE updated_at IS NULL`,
        { transaction },
      );
      // stomach_checkup table
      await queryInterface.addColumn(
        'stomach_checkup',
        'created_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'stomach_checkup',
        'updated_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE stomach_checkup SET created_at='${dateNow}' WHERE created_at IS NULL`,
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE stomach_checkup SET updated_at='${dateNow}' WHERE updated_at IS NULL`,
        { transaction },
      );
      // patient table
      await queryInterface.changeColumn(
        'patient',
        'created_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'patient',
        'updated_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE patient SET updated_at='${dateNow}' WHERE updated_at IS NULL`,
        { transaction },
      );
      // tongue_checkup table
      await queryInterface.addColumn(
        'tongue_checkup',
        'created_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'tongue_checkup',
        'updated_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE tongue_checkup SET created_at='${dateNow}' WHERE created_at IS NULL`,
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE tongue_checkup SET updated_at='${dateNow}' WHERE updated_at IS NULL`,
        { transaction },
      );
      // duration_advice table
      await queryInterface.addColumn(
        'duration_advice',
        'created_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'duration_advice',
        'updated_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE duration_advice SET created_at='${dateNow}' WHERE created_at IS NULL`,
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE duration_advice SET updated_at='${dateNow}' WHERE updated_at IS NULL`,
        { transaction },
      );
      // treatment table
      await queryInterface.changeColumn(
        'treatment',
        'created_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'treatment',
        'updated_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE treatment SET updated_at='${dateNow}' WHERE updated_at IS NULL`,
        { transaction },
      );
      // treatment_doctor_diagnosis table
      await queryInterface.addColumn(
        'treatment_doctor_diagnosis',
        'created_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'treatment_doctor_diagnosis',
        'updated_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE treatment_doctor_diagnosis SET created_at='${dateNow}' WHERE created_at IS NULL`,
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE treatment_doctor_diagnosis SET updated_at='${dateNow}' WHERE updated_at IS NULL`,
        { transaction },
      );
      // treatment_medicine table
      await queryInterface.addColumn(
        'treatment_medicine',
        'created_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'treatment_medicine',
        'updated_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE treatment_medicine SET created_at='${dateNow}' WHERE created_at IS NULL`,
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE treatment_medicine SET updated_at='${dateNow}' WHERE updated_at IS NULL`,
        { transaction },
      );
      // treatment_therapy_history table
      await queryInterface.addColumn(
        'treatment_therapy_history',
        'created_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'treatment_therapy_history',
        'updated_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE treatment_therapy_history SET created_at='${dateNow}' WHERE created_at IS NULL`,
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE treatment_therapy_history SET updated_at='${dateNow}' WHERE updated_at IS NULL`,
        { transaction },
      );
      // treatment_complaint table
      await queryInterface.addColumn(
        'treatment_complaint',
        'created_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'treatment_complaint',
        'updated_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE treatment_complaint SET created_at='${dateNow}' WHERE created_at IS NULL`,
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE treatment_complaint SET updated_at='${dateNow}' WHERE updated_at IS NULL`,
        { transaction },
      );
      // treatment_stomach_checkup table
      await queryInterface.addColumn(
        'treatment_stomach_checkup',
        'created_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'treatment_stomach_checkup',
        'updated_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE treatment_stomach_checkup SET created_at='${dateNow}' WHERE created_at IS NULL`,
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE treatment_stomach_checkup SET updated_at='${dateNow}' WHERE updated_at IS NULL`,
        { transaction },
      );
      // treatment_tongue_checkup table
      await queryInterface.addColumn(
        'treatment_tongue_checkup',
        'created_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'treatment_tongue_checkup',
        'updated_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE treatment_tongue_checkup SET created_at='${dateNow}' WHERE created_at IS NULL`,
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE treatment_tongue_checkup SET updated_at='${dateNow}' WHERE updated_at IS NULL`,
        { transaction },
      );
      // treatment_therapy table
      await queryInterface.addColumn(
        'treatment_therapy',
        'created_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'treatment_therapy',
        'updated_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE treatment_therapy SET created_at='${dateNow}' WHERE created_at IS NULL`,
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE treatment_therapy SET updated_at='${dateNow}' WHERE updated_at IS NULL`,
        { transaction },
      );
      // treatment_self_therapy table
      await queryInterface.addColumn(
        'treatment_self_therapy',
        'created_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'treatment_self_therapy',
        'updated_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE treatment_self_therapy SET created_at='${dateNow}' WHERE created_at IS NULL`,
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE treatment_self_therapy SET updated_at='${dateNow}' WHERE updated_at IS NULL`,
        { transaction },
      );
      // treatment_pulse_checkup table
      await queryInterface.addColumn(
        'treatment_pulse_checkup',
        'created_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'treatment_pulse_checkup',
        'updated_at',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE treatment_pulse_checkup SET created_at='${dateNow}' WHERE created_at IS NULL`,
        { transaction },
      );
      await queryInterface.sequelize.query(
        `UPDATE treatment_pulse_checkup SET updated_at='${dateNow}' WHERE updated_at IS NULL`,
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
      await queryInterface.removeColumn('user', 'created_at', { transaction });
      await queryInterface.removeColumn('clinic', 'created_at', {
        transaction,
      });
      await queryInterface.removeColumn('medicine', 'created_at', {
        transaction,
      });
      await queryInterface.removeColumn('doctor_diagnosis', 'created_at', {
        transaction,
      });
      await queryInterface.removeColumn('self_therapy', 'created_at', {
        transaction,
      });
      await queryInterface.removeColumn('treatment_packet', 'created_at', {
        transaction,
      });
      await queryInterface.removeColumn('therapy', 'created_at', {
        transaction,
      });
      await queryInterface.removeColumn('meridian', 'created_at', {
        transaction,
      });
      await queryInterface.removeColumn('complaint', 'created_at', {
        transaction,
      });
      await queryInterface.removeColumn('stomach_checkup', 'created_at', {
        transaction,
      });
      await queryInterface.removeColumn('tongue_checkup', 'created_at', {
        transaction,
      });
      await queryInterface.removeColumn('duration_advice', 'created_at', {
        transaction,
      });
      await queryInterface.removeColumn(
        'treatment_doctor_diagnosis',
        'created_at',
        { transaction },
      );
      await queryInterface.removeColumn('treatment_medicine', 'created_at', {
        transaction,
      });
      await queryInterface.removeColumn(
        'treatment_therapy_history',
        'created_at',
        { transaction },
      );
      await queryInterface.removeColumn('treatment_complaint', 'created_at', {
        transaction,
      });
      await queryInterface.removeColumn(
        'treatment_stomach_checkup',
        'created_at',
        { transaction },
      );
      await queryInterface.removeColumn(
        'treatment_tongue_checkup',
        'created_at',
        { transaction },
      );
      await queryInterface.removeColumn('treatment_therapy', 'created_at', {
        transaction,
      });
      await queryInterface.removeColumn(
        'treatment_self_therapy',
        'created_at',
        { transaction },
      );
      await queryInterface.removeColumn(
        'treatment_pulse_checkup',
        'created_at',
        { transaction },
      );
      await queryInterface.removeColumn('user', 'updated_at', { transaction });
      await queryInterface.removeColumn('clinic', 'updated_at', {
        transaction,
      });
      await queryInterface.removeColumn('medicine', 'updated_at', {
        transaction,
      });
      await queryInterface.removeColumn('doctor_diagnosis', 'updated_at', {
        transaction,
      });
      await queryInterface.removeColumn('self_therapy', 'updated_at', {
        transaction,
      });
      await queryInterface.removeColumn('treatment_packet', 'updated_at', {
        transaction,
      });
      await queryInterface.removeColumn('therapy', 'updated_at', {
        transaction,
      });
      await queryInterface.removeColumn('meridian', 'updated_at', {
        transaction,
      });
      await queryInterface.removeColumn('complaint', 'updated_at', {
        transaction,
      });
      await queryInterface.removeColumn('stomach_checkup', 'updated_at', {
        transaction,
      });
      await queryInterface.removeColumn('patient', 'updated_at', {
        transaction,
      });
      await queryInterface.removeColumn('tongue_checkup', 'updated_at', {
        transaction,
      });
      await queryInterface.removeColumn('duration_advice', 'updated_at', {
        transaction,
      });
      await queryInterface.removeColumn('treatment', 'updated_at', {
        transaction,
      });
      await queryInterface.removeColumn(
        'treatment_doctor_diagnosis',
        'updated_at',
        { transaction },
      );
      await queryInterface.removeColumn('treatment_medicine', 'updated_at', {
        transaction,
      });
      await queryInterface.removeColumn(
        'treatment_therapy_history',
        'updated_at',
        { transaction },
      );
      await queryInterface.removeColumn('treatment_complaint', 'updated_at', {
        transaction,
      });
      await queryInterface.removeColumn(
        'treatment_stomach_checkup',
        'updated_at',
        { transaction },
      );
      await queryInterface.removeColumn(
        'treatment_tongue_checkup',
        'updated_at',
        { transaction },
      );
      await queryInterface.removeColumn('treatment_therapy', 'updated_at', {
        transaction,
      });
      await queryInterface.removeColumn(
        'treatment_self_therapy',
        'updated_at',
        { transaction },
      );
      await queryInterface.removeColumn(
        'treatment_pulse_checkup',
        'updated_at',
        { transaction },
      );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
