import { Clinic } from './clinic.entity';
import { Complaint } from './complaint.entity';
import { DoctorDiagnosis } from './doctor_diagnosis.entity';
import { DurationAdvice } from './duration_advice.entity';
import { Medicine } from './medicine.entity';
import { Meridian } from './meridian.entity';
import { Patient } from './patient.entity';
import { SelfTherapy } from './self_therapy.entity';
import { StomachCheckup } from './stomach_checkup.entity';
import { Therapy } from './therapy.entity';
import { TongueCheckup } from './tongue_checkup.entity';
import { TreatmentPacket } from './treatment_packet.entity';
import { User } from './user.entity';

export default () => [
  User,
  Clinic,
  Medicine,
  DoctorDiagnosis,
  SelfTherapy,
  TreatmentPacket,
  Therapy,
  Meridian,
  Complaint,
  StomachCheckup,
  TongueCheckup,
  Patient,
  DurationAdvice,
];
