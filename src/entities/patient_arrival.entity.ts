import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Patient } from './patient.entity';
import { User } from './user.entity';

@Table({ tableName: 'patient_arrival' })
export class PatientArrival extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT.UNSIGNED)
  id: number;

  @Default(false)
  @Column(DataType.BOOLEAN)
  done: boolean;

  @Column(DataType.STRING)
  type: string;

  @Column(DataType.DATE)
  date: Date;

  @AllowNull(false)
  @Column(DataType.BIGINT.UNSIGNED)
  patient_id: number;

  @AllowNull(false)
  @Column(DataType.BIGINT.UNSIGNED)
  user_id: number;

  @Column(DataType.BIGINT.UNSIGNED)
  tag_user_id: number;

  @BelongsTo(() => Patient, 'patient_id')
  patient: Patient;

  @BelongsTo(() => User, 'user_id')
  user: User;

  @BelongsTo(() => User, 'tag_user_id')
  tag_user: User;
}
