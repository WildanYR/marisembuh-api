import {
  AllowNull,
  AutoIncrement,
  BeforeValidate,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from './user.entity';
import { Clinic } from './clinic.entity';
import { RM_PREFIX } from 'src/constants/database.const';

@Table({ tableName: 'patient' })
export class Patient extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT.UNSIGNED)
  id: number;

  @Column(DataType.VIRTUAL)
  get no_rm() {
    const idStr = this.id.toString().padStart(6, '0');
    return RM_PREFIX + idStr;
  }

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @Column(DataType.ENUM('L', 'P'))
  gender: string;

  @Column(DataType.DATEONLY)
  birthdate: Date;

  @Column(DataType.STRING)
  address: string;

  @Column(DataType.STRING)
  telp: string;

  @Column(DataType.DATE)
  created_at: Date;

  @ForeignKey(() => User)
  @Column(DataType.BIGINT.UNSIGNED)
  user_id: number;

  @ForeignKey(() => Clinic)
  @Column(DataType.BIGINT.UNSIGNED)
  clinic_id: number;

  @BelongsTo(() => User, 'user_id')
  registered_by: User;

  @BelongsTo(() => Clinic, 'clinic_id')
  register_clinic: Clinic;

  @BeforeValidate
  static fillCreatedAt(patient: Patient) {
    if (!patient.created_at) {
      patient.created_at = new Date();
    }
  }
}
