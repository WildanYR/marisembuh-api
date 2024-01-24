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
import { SelfTherapy } from './self_therapy.entity';

@Table({ tableName: 'treatment_self_therapy' })
export class TreatmentSelfTherapy extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT.UNSIGNED)
  id: number;

  @AllowNull(false)
  @ForeignKey(() => Treatment)
  @Column(DataType.BIGINT.UNSIGNED)
  treatment_id: number;

  @AllowNull(false)
  @ForeignKey(() => SelfTherapy)
  @Column(DataType.BIGINT.UNSIGNED)
  self_therapy_id: number;

  @BelongsTo(() => Treatment, 'treatment_id')
  treatment: Treatment;

  @BelongsTo(() => SelfTherapy, 'self_therapy_id')
  self_therapy: SelfTherapy;
}
