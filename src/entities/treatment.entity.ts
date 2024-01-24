import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Patient } from './patient.entity';
import { TreatmentPacket } from './treatment_packet.entity';
import { DoctorDiagnosis } from './doctor_diagnosis.entity';
import { TreatmentDoctorDiagnosis } from './treatment_doctor_diagnosis.entity';
import { Medicine } from './medicine.entity';
import { TreatmentMedicine } from './treatment_medicine.entity';
import { Therapy } from './therapy.entity';
import { TreatmentTherapyHistory } from './treatment_therapy_history.entity';
import { Complaint } from './complaint.entity';
import { TreatmentComplaint } from './treatment_complaint.entity';
import { StomachCheckup } from './stomach_checkup.entity';
import { TreatmentStomachCheckup } from './treatment_stomach_checkup.entity';
import { TreatmentPulseCheckup } from './treatment_pulse_checkup.entity';
import { TreatmentTongueCheckup } from './treatment_tongue_checkup.entity';
import { TreatmentTherapy } from './treatment_therapy.entity';
import { TreatmentSelfTherapy } from './treatment_self_therapy.entity';
import { SelfTherapy } from './self_therapy.entity';
import { TongueCheckup } from './tongue_checkup.entity';
import { DurationAdvice } from './duration_advice.entity';

@Table({ tableName: 'treatment' })
export class Treatment extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT.UNSIGNED)
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  objective: string;

  @Column(DataType.STRING)
  blood_pressure: string;

  @Column(DataType.STRING)
  pulse_frequency: string;

  @Column(DataType.BOOLEAN)
  is_pregnant: boolean;

  @Column(DataType.TEXT('long'))
  evaluation: string;

  @ForeignKey(() => Patient)
  @Column(DataType.BIGINT.UNSIGNED)
  patient_id: number;

  @ForeignKey(() => DurationAdvice)
  @Column(DataType.BIGINT.UNSIGNED)
  duration_advice_id: number;

  @Column(DataType.DATE)
  created_at: Date;

  @ForeignKey(() => TreatmentPacket)
  @Column(DataType.BIGINT.UNSIGNED)
  treatment_packet_id: number;

  @BelongsTo(() => Patient, 'patient_id')
  patient: Patient;

  @BelongsTo(() => DurationAdvice, 'duration_advice_id')
  duration_advice: DurationAdvice;

  @BelongsTo(() => TreatmentPacket, 'treatment_packet_id')
  treatment_packet: TreatmentPacket;

  @BelongsToMany(() => DoctorDiagnosis, () => TreatmentDoctorDiagnosis)
  doctor_diagnosis: DoctorDiagnosis[];

  @BelongsToMany(() => Medicine, () => TreatmentMedicine)
  medicine: Medicine[];

  @BelongsToMany(() => Therapy, () => TreatmentTherapyHistory)
  therapy_history: Therapy[];

  @BelongsToMany(() => Complaint, () => TreatmentComplaint)
  complaint: Complaint[];

  @BelongsToMany(() => StomachCheckup, () => TreatmentStomachCheckup)
  stomach_checkup: StomachCheckup[];

  @BelongsToMany(() => TongueCheckup, () => TreatmentTongueCheckup)
  tongue_checkup: TongueCheckup[];

  @HasOne(() => TreatmentPulseCheckup)
  pulse_checkup: TreatmentPulseCheckup;

  @BelongsToMany(() => Therapy, () => TreatmentTherapy)
  therapy: Therapy[];

  @BelongsToMany(() => SelfTherapy, () => TreatmentSelfTherapy)
  self_therapy: SelfTherapy[];
}
