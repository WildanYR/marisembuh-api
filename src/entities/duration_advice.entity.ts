import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'duration_advice' })
export class DurationAdvice extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT.UNSIGNED)
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;
}
