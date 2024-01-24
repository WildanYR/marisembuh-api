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
import { TongueCheckup } from './tongue_checkup.entity';

@Table({ tableName: 'treatment_tongue_checkup' })
export class TreatmentTongueCheckup extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT.UNSIGNED)
  id: number;

  @AllowNull(false)
  @ForeignKey(() => Treatment)
  @Column(DataType.BIGINT.UNSIGNED)
  treatment_id: number;

  @AllowNull(false)
  @ForeignKey(() => TongueCheckup)
  @Column(DataType.BIGINT.UNSIGNED)
  tongue_checkup_id: number;

  @BelongsTo(() => Treatment, 'treatment_id')
  treatment: Treatment;

  @BelongsTo(() => TongueCheckup, 'tongue_checkup_id')
  tongue_checkup: TongueCheckup;
}
