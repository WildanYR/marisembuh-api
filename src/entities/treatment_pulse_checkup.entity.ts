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

@Table({ tableName: 'treatment_pulse_checkup' })
export class TreatmentPulseCheckup extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT.UNSIGNED)
  id: number;

  @AllowNull(false)
  @ForeignKey(() => Treatment)
  @Column(DataType.BIGINT.UNSIGNED)
  treatment_id: number;

  @Column(DataType.STRING)
  depth: string;

  @Column(DataType.STRING)
  speed: string;

  @Column(DataType.STRING)
  power: string;

  @Column(DataType.STRING)
  abnormal_type: string;

  @Column(DataType.STRING)
  location_differentiation: string;

  @BelongsTo(() => Treatment, 'treatment_id')
  treatment: Treatment;
}
