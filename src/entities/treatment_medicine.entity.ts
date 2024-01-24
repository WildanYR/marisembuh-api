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
import { Medicine } from './medicine.entity';

@Table({ tableName: 'treatment_medicine' })
export class TreatmentMedicine extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT.UNSIGNED)
  id: number;

  @AllowNull(false)
  @ForeignKey(() => Treatment)
  @Column(DataType.BIGINT.UNSIGNED)
  treatment_id: number;

  @AllowNull(false)
  @ForeignKey(() => Medicine)
  @Column(DataType.BIGINT.UNSIGNED)
  medicine_id: number;

  @BelongsTo(() => Treatment, 'treatment_id')
  treatment: Treatment;

  @BelongsTo(() => Medicine, 'medicine_id')
  medicine: Medicine;
}
