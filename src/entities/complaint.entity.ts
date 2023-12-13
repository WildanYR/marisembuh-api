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
import { Meridian } from './meridian.entity';

@Table({ tableName: 'complaint' })
export class Complaint extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT.UNSIGNED)
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @ForeignKey(() => Meridian)
  @AllowNull(false)
  @Column(DataType.BIGINT.UNSIGNED)
  meridian_id: number;

  @BelongsTo(() => Meridian, 'meridian_id')
  meridian: Meridian;
}
