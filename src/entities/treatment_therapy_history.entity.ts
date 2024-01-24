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
import { Therapy } from './therapy.entity';

@Table({ tableName: 'treatment_therapy_history' })
export class TreatmentTherapyHistory extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT.UNSIGNED)
  id: number;

  @AllowNull(false)
  @ForeignKey(() => Treatment)
  @Column(DataType.BIGINT.UNSIGNED)
  treatment_id: number;

  @AllowNull(false)
  @ForeignKey(() => Therapy)
  @Column(DataType.BIGINT.UNSIGNED)
  therapy_id: number;

  @BelongsTo(() => Treatment, 'treatment_id')
  treatment: Treatment;

  @BelongsTo(() => Therapy, 'therapy_id')
  therapy: Therapy;
}
