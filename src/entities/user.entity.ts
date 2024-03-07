import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Patient } from './patient.entity';
import { Clinic } from './clinic.entity';
import { Absence } from './absence.entity';

@Table({ tableName: 'user' })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT.UNSIGNED)
  id: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  email: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  role: string;

  @ForeignKey(() => Clinic)
  @Column(DataType.BIGINT.UNSIGNED)
  clinic_id: number;

  @HasMany(() => Patient)
  patients: Patient[];

  @HasMany(() => Absence)
  absences: Absence[];

  @BelongsTo(() => Clinic, 'clinic_id')
  clinic: Clinic;
}
