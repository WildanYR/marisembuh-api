import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Treatment } from './treatment.entity';
import { DoctorDiagnosis } from './doctor_diagnosis.entity';

@Table({ tableName: 'treatment_doctor_diagnosis' })
export class TreatmentDoctorDiagnosis extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT.UNSIGNED)
  id: number;

  @AllowNull(false)
  @ForeignKey(() => Treatment)
  @Column(DataType.BIGINT.UNSIGNED)
  treatment_id: number;

  @AllowNull(false)
  @ForeignKey(() => DoctorDiagnosis)
  @Column(DataType.BIGINT.UNSIGNED)
  doctor_diagnosis_id: number;

  @BelongsTo(() => Treatment, 'treatment_id')
  treatment: Treatment;

  @BelongsTo(() => DoctorDiagnosis, 'doctor_diagnosis_id')
  doctor_diagnosis: DoctorDiagnosis;
}
