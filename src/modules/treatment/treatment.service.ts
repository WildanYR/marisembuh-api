import { Inject, Injectable } from '@nestjs/common';
import { Treatment } from 'src/entities/treatment.entity';
import { ICreateTreatment } from './types/create_treatment.type';
import { MysqlProvider } from 'src/database/mysql.provider';
import { TreatmentDoctorDiagnosis } from 'src/entities/treatment_doctor_diagnosis.entity';
import { TreatmentMedicine } from 'src/entities/treatment_medicine.entity';
import { TreatmentTherapyHistory } from 'src/entities/treatment_therapy_history.entity';
import { TreatmentComplaint } from 'src/entities/treatment_complaint.entity';
import { TreatmentStomachCheckup } from 'src/entities/treatment_stomach_checkup.entity';
import { TreatmentSelfTherapy } from 'src/entities/treatment_self_therapy.entity';
import { TreatmentTherapy } from 'src/entities/treatment_therapy.entity';
import { TreatmentPulseCheckup } from 'src/entities/treatment_pulse_checkup.entity';
import { TreatmentTongueCheckup } from 'src/entities/treatment_tongue_checkup.entity';
import { IPagination, IPaginationResponse } from 'src/types/pagination.type';
import { PaginationUtility } from 'src/utils/pagination.util';
import { DoctorDiagnosis } from 'src/entities/doctor_diagnosis.entity';
import { Medicine } from 'src/entities/medicine.entity';
import { Therapy } from 'src/entities/therapy.entity';
import { Complaint } from 'src/entities/complaint.entity';
import { StomachCheckup } from 'src/entities/stomach_checkup.entity';
import { TongueCheckup } from 'src/entities/tongue_checkup.entity';
import { SelfTherapy } from 'src/entities/self_therapy.entity';
import { IUpdateTreatment } from './types/update_treatment.type';
import { Patient } from 'src/entities/patient.entity';
import { Meridian } from 'src/entities/meridian.entity';
import { Includeable } from 'sequelize';
import { DurationAdvice } from 'src/entities/duration_advice.entity';
import { TreatmentPacket } from 'src/entities/treatment_packet.entity';
import { User } from 'src/entities/user.entity';
import { Clinic } from 'src/entities/clinic.entity';
import { IGetTreatmentQuery } from './types/get_treatment_query.type';
import {
  MYSQL_PROVIDER,
  PAGINATION_DEFAULT_LIMIT,
} from 'src/constants/database.const';
import {
  TREATMENT_REPOSITORY,
  TREATMENT_DOCTOR_DIAGNOSIS_REPOSITORY,
  TREATMENT_MEDICINE_REPOSITORY,
  TREATMENT_THERAPY_HISTORY_REPOSITORY,
  TREATMENT_COMPLAINT_REPOSITORY,
  TREATMENT_STOMACH_CHECKUP_REPOSITORY,
  TREATMENT_TONGUE_CHECKUP_REPOSITORY,
  TREATMENT_PULSE_CHECKUP_REPOSITORY,
  TREATMENT_THERAPY_REPOSITORY,
  TREATMENT_SELF_THERAPY_REPOSITORY,
  PATIENT_ARRIVAL_REPOSITORY,
} from 'src/constants/repository.const';
import { PatientArrival } from 'src/entities/patient_arrival.entity';

@Injectable()
export class TreatmentService {
  getInclude: Includeable[] = [
    {
      model: Patient,
      as: 'patient',
      attributes: ['id', 'no_rm', 'name', 'gender', 'address'],
    },
    {
      model: User,
      as: 'user',
    },
    {
      model: Clinic,
      as: 'clinic',
    },
  ];
  getIncludeAll: Includeable[] = [
    {
      model: DurationAdvice,
      as: 'duration_advice',
    },
    {
      model: DoctorDiagnosis,
      as: 'doctor_diagnosis',
      through: {
        attributes: [],
      },
    },
    {
      model: Medicine,
      as: 'medicine',
      through: {
        attributes: [],
      },
    },
    {
      model: Therapy,
      as: 'therapy_history',
      through: {
        attributes: [],
      },
    },
    {
      model: Complaint,
      as: 'complaint',
      through: {
        attributes: [],
      },
      include: [{ model: Meridian, as: 'meridian' }],
    },
    {
      model: StomachCheckup,
      as: 'stomach_checkup',
      through: {
        attributes: [],
      },
    },
    {
      model: TongueCheckup,
      as: 'tongue_checkup',
      through: {
        attributes: [],
      },
    },
    {
      model: TreatmentPulseCheckup,
      as: 'pulse_checkup',
    },
    {
      model: Therapy,
      as: 'therapy',
      through: {
        attributes: ['detail'],
      },
    },
    {
      model: SelfTherapy,
      as: 'self_therapy',
      through: {
        attributes: [],
      },
    },
    {
      model: TreatmentPacket,
      as: 'treatment_packet',
    },
    ...this.getInclude,
  ];

  constructor(
    private paginationUtility: PaginationUtility,
    @Inject(MYSQL_PROVIDER) private mysqlProvider: MysqlProvider,
    @Inject(TREATMENT_REPOSITORY) private treatmentRepository: typeof Treatment,
    @Inject(TREATMENT_DOCTOR_DIAGNOSIS_REPOSITORY)
    private treatmentDoctorDiagnosisRepository: typeof TreatmentDoctorDiagnosis,
    @Inject(TREATMENT_MEDICINE_REPOSITORY)
    private treatmentMedicineRepository: typeof TreatmentMedicine,
    @Inject(TREATMENT_THERAPY_HISTORY_REPOSITORY)
    private treatmentTherapyHistoryRepository: typeof TreatmentTherapyHistory,
    @Inject(TREATMENT_COMPLAINT_REPOSITORY)
    private treatmentComplaintRepository: typeof TreatmentComplaint,
    @Inject(TREATMENT_STOMACH_CHECKUP_REPOSITORY)
    private treatmentStomachCheckupRepository: typeof TreatmentStomachCheckup,
    @Inject(TREATMENT_TONGUE_CHECKUP_REPOSITORY)
    private treatmentTongueCheckupRepository: typeof TreatmentTongueCheckup,
    @Inject(TREATMENT_PULSE_CHECKUP_REPOSITORY)
    private treatmentPulseCheckupRepository: typeof TreatmentPulseCheckup,
    @Inject(TREATMENT_THERAPY_REPOSITORY)
    private treatmentTherapyRepository: typeof TreatmentTherapy,
    @Inject(TREATMENT_SELF_THERAPY_REPOSITORY)
    private treatmentSelfTherapyRepository: typeof TreatmentSelfTherapy,
    @Inject(PATIENT_ARRIVAL_REPOSITORY)
    private patientArrivalRepository: typeof PatientArrival,
  ) {}

  async getAllWithPagination(
    getTreatmentQuery: IGetTreatmentQuery,
    pagination: IPagination,
  ): Promise<IPaginationResponse<Treatment>> {
    const offset = this.paginationUtility.calculateOffset(pagination);
    const limit = pagination.limit || PAGINATION_DEFAULT_LIMIT;
    const include = getTreatmentQuery.with_relation
      ? this.getIncludeAll
      : this.getInclude;
    const attributes = getTreatmentQuery.with_relation
      ? null
      : ['id', 'objective', 'patient_id', 'created_at'];

    let condition: any = {};
    if (getTreatmentQuery.patient_id) {
      condition.patient_id = getTreatmentQuery.patient_id;
    }
    if (getTreatmentQuery.user_id) {
      condition.user_id = getTreatmentQuery.user_id;
    }
    if (getTreatmentQuery.clinic_id) {
      condition.clinic_id = getTreatmentQuery.clinic_id;
    }

    const treatment = await this.treatmentRepository.findAndCountAll({
      where: condition,
      order: [['created_at', 'DESC']],
      include,
      attributes,
      limit,
      offset,
    });
    return this.paginationUtility.paginationResponse(
      pagination,
      treatment.rows,
      treatment.count,
    );
  }

  async findById(treatmentId: number): Promise<Treatment> {
    const treatment = await this.treatmentRepository.findOne({
      where: { id: treatmentId },
      include: this.getIncludeAll,
    });
    return treatment;
  }

  async create(createTreatmentDTO: ICreateTreatment): Promise<void> {
    const transaction = await this.mysqlProvider.transaction();
    try {
      const {
        objective,
        blood_pressure,
        pulse_frequency,
        is_pregnant,
        evaluation,
        duration_advice_id,
        patient_id,
        treatment_packet_id,
        user_id,
        clinic_id,
        ...treatmentDetail
      } = createTreatmentDTO;
      const now = new Date();
      const treatment = await this.treatmentRepository.create(
        {
          objective,
          blood_pressure,
          pulse_frequency,
          is_pregnant,
          evaluation,
          duration_advice_id,
          patient_id,
          treatment_packet_id,
          user_id,
          clinic_id,
          created_at: now,
        },
        {
          transaction,
        },
      );

      if (treatmentDetail?.doctor_diagnosis?.length) {
        const doctorDiagnosisData = treatmentDetail.doctor_diagnosis.map(
          (item) => ({
            treatment_id: treatment.id,
            doctor_diagnosis_id: item,
          }),
        );
        await this.treatmentDoctorDiagnosisRepository.bulkCreate(
          doctorDiagnosisData,
          { transaction },
        );
      }

      if (treatmentDetail?.medicine?.length) {
        const medicineData = treatmentDetail.medicine.map((item) => ({
          treatment_id: treatment.id,
          medicine_id: item,
        }));
        await this.treatmentMedicineRepository.bulkCreate(medicineData, {
          transaction,
        });
      }

      if (treatmentDetail?.therapy_history?.length) {
        const therapyHistoryData = treatmentDetail.therapy_history.map(
          (item) => ({
            treatment_id: treatment.id,
            therapy_id: item,
          }),
        );
        await this.treatmentTherapyHistoryRepository.bulkCreate(
          therapyHistoryData,
          {
            transaction,
          },
        );
      }

      if (treatmentDetail?.complaint?.length) {
        const complaintData = treatmentDetail.complaint.map((item) => ({
          treatment_id: treatment.id,
          complaint_id: item,
        }));
        await this.treatmentComplaintRepository.bulkCreate(complaintData, {
          transaction,
        });
      }

      if (treatmentDetail?.stomach_checkup?.length) {
        const stomachCheckupData = treatmentDetail.stomach_checkup.map(
          (item) => ({
            treatment_id: treatment.id,
            stomach_checkup_id: item,
          }),
        );
        await this.treatmentStomachCheckupRepository.bulkCreate(
          stomachCheckupData,
          {
            transaction,
          },
        );
      }

      if (treatmentDetail?.tongue_checkup?.length) {
        const tongueCheckupData = treatmentDetail.tongue_checkup.map(
          (item) => ({
            treatment_id: treatment.id,
            tongue_checkup_id: item,
          }),
        );
        await this.treatmentTongueCheckupRepository.bulkCreate(
          tongueCheckupData,
          {
            transaction,
          },
        );
      }

      if (treatmentDetail?.pulse_checkup) {
        await this.treatmentPulseCheckupRepository.create(
          {
            treatment_id: treatment.id,
            ...treatmentDetail.pulse_checkup,
          },
          { transaction },
        );
      }

      if (treatmentDetail?.self_therapy?.length) {
        const selfTherapyData = treatmentDetail.self_therapy.map((item) => ({
          treatment_id: treatment.id,
          self_therapy_id: item,
        }));
        await this.treatmentSelfTherapyRepository.bulkCreate(selfTherapyData, {
          transaction,
        });
      }

      if (treatmentDetail?.therapy?.length) {
        const therapyData = treatmentDetail.therapy.map((item) => ({
          treatment_id: treatment.id,
          therapy_id: item.id,
          detail: item.detail,
        }));
        await this.treatmentTherapyRepository.bulkCreate(therapyData, {
          transaction,
        });
      }

      // update patient arrival status to done
      await this.patientArrivalRepository.update(
        { done: true },
        {
          where: {
            patient_id: createTreatmentDTO.patient_id,
            user_id: createTreatmentDTO.user_id,
          },
          transaction,
        },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async update(
    treatmentId: number,
    updateTreatmentDTO: IUpdateTreatment,
  ): Promise<void> {
    const transaction = await this.mysqlProvider.transaction();
    try {
      const {
        objective,
        blood_pressure,
        pulse_frequency,
        is_pregnant,
        evaluation,
        duration_advice_id,
        patient_id,
        user_id,
        clinic_id,
        treatment_packet_id,
        ...treatmentDetail
      } = updateTreatmentDTO;

      const data = new Map();

      if (objective) data.set('objective', objective);
      if (blood_pressure) data.set('blood_pressure', blood_pressure);
      if (pulse_frequency) data.set('pulse_frequency', pulse_frequency);
      if (typeof is_pregnant === 'boolean')
        data.set('is_pregnant', is_pregnant);
      if (evaluation) data.set('evaluation', evaluation);
      if (duration_advice_id)
        data.set('duration_advice_id', duration_advice_id);
      if (patient_id) data.set('patient_id', patient_id);
      if (treatment_packet_id)
        data.set('treatment_packet_id', treatment_packet_id);
      if (user_id) data.set('user_id', user_id);
      if (clinic_id) data.set('clinic_id', clinic_id);

      if (data.size) {
        await this.treatmentRepository.update(Object.fromEntries(data), {
          where: { id: treatmentId },
          transaction,
        });
      }

      if (treatmentDetail.doctor_diagnosis) {
        await this.treatmentDoctorDiagnosisRepository.destroy({
          where: { treatment_id: treatmentId },
          transaction,
        });
        const addData = treatmentDetail.doctor_diagnosis.map((item) => ({
          treatment_id: treatmentId,
          doctor_diagnosis_id: item,
        }));
        await this.treatmentDoctorDiagnosisRepository.bulkCreate(addData, {
          transaction,
        });
      }

      if (treatmentDetail.medicine) {
        await this.treatmentMedicineRepository.destroy({
          where: { treatment_id: treatmentId },
          transaction,
        });
        const addData = treatmentDetail.medicine.map((item) => ({
          treatment_id: treatmentId,
          medicine_id: item,
        }));
        await this.treatmentMedicineRepository.bulkCreate(addData, {
          transaction,
        });
      }

      if (treatmentDetail.therapy_history) {
        await this.treatmentTherapyHistoryRepository.destroy({
          where: { treatment_id: treatmentId },
          transaction,
        });
        const addData = treatmentDetail.therapy_history.map((item) => ({
          treatment_id: treatmentId,
          therapy_id: item,
        }));
        await this.treatmentTherapyHistoryRepository.bulkCreate(addData, {
          transaction,
        });
      }

      if (treatmentDetail.complaint) {
        await this.treatmentComplaintRepository.destroy({
          where: { treatment_id: treatmentId },
          transaction,
        });
        const addData = treatmentDetail.complaint.map((item) => ({
          treatment_id: treatmentId,
          complaint_id: item,
        }));
        await this.treatmentComplaintRepository.bulkCreate(addData, {
          transaction,
        });
      }

      if (treatmentDetail.stomach_checkup) {
        await this.treatmentStomachCheckupRepository.destroy({
          where: { treatment_id: treatmentId },
          transaction,
        });
        const addData = treatmentDetail.stomach_checkup.map((item) => ({
          treatment_id: treatmentId,
          stomach_checkup_id: item,
        }));
        await this.treatmentStomachCheckupRepository.bulkCreate(addData, {
          transaction,
        });
      }

      if (treatmentDetail.tongue_checkup) {
        await this.treatmentTongueCheckupRepository.destroy({
          where: { treatment_id: treatmentId },
          transaction,
        });
        const addData = treatmentDetail.tongue_checkup.map((item) => ({
          treatment_id: treatmentId,
          tongue_checkup_id: item,
        }));
        await this.treatmentTongueCheckupRepository.bulkCreate(addData, {
          transaction,
        });
      }

      if (treatmentDetail.pulse_checkup) {
        await this.treatmentPulseCheckupRepository.update(
          treatmentDetail.pulse_checkup,
          { where: { treatment_id: treatmentId }, transaction },
        );
      }

      if (treatmentDetail.self_therapy) {
        await this.treatmentSelfTherapyRepository.destroy({
          where: { treatment_id: treatmentId },
          transaction,
        });
        const addData = treatmentDetail.self_therapy.map((item) => ({
          treatment_id: treatmentId,
          self_therapy_id: item,
        }));
        await this.treatmentSelfTherapyRepository.bulkCreate(addData, {
          transaction,
        });
      }

      if (treatmentDetail.therapy) {
        await this.treatmentTherapyRepository.destroy({
          where: { treatment_id: treatmentId },
          transaction,
        });
        const addData = treatmentDetail.therapy.map((item) => ({
          treatment_id: treatmentId,
          therapy_id: item.id,
          detail: item.detail,
        }));
        await this.treatmentTherapyRepository.bulkCreate(addData, {
          transaction,
        });
      }
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async destroy(treatmentId: number): Promise<void> {
    await this.treatmentRepository.destroy({ where: { id: treatmentId } });
  }
}
