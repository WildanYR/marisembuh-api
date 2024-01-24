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
import { StomachCheckup } from './stomach_checkup.entity';

@Table({ tableName: 'treatment_stomach_checkup' })
export class TreatmentStomachCheckup extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT.UNSIGNED)
  id: number;

  @AllowNull(false)
  @ForeignKey(() => Treatment)
  @Column(DataType.BIGINT.UNSIGNED)
  treatment_id: number;

  @AllowNull(false)
  @ForeignKey(() => StomachCheckup)
  @Column(DataType.BIGINT.UNSIGNED)
  stomach_checkup_id: number;

  @BelongsTo(() => Treatment, 'treatment_id')
  treatment: Treatment;

  @BelongsTo(() => StomachCheckup, 'stomach_checkup_id')
  stomach_checkup: StomachCheckup;
}
