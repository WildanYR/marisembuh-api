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
import { User } from './user.entity';

@Table({ tableName: 'absence' })
export class Absence extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT.UNSIGNED)
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  type: string;

  @Column(DataType.DATE)
  in_clinic_time: Date;

  @Column(DataType.DATE)
  afterwork_time: Date;

  @Column(DataType.STRING)
  absence_code: string;

  @ForeignKey(() => User)
  @Column(DataType.BIGINT.UNSIGNED)
  user_id: number;

  @ForeignKey(() => User)
  @Column(DataType.BIGINT.UNSIGNED)
  code_from: number;

  @BelongsTo(() => User, 'user_id')
  user: User;

  @BelongsTo(() => User, 'code_from')
  user_code_from: User;
}
