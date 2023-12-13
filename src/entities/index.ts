import { Clinic } from './clinic.entity';
import { Complaint } from './complaint.entity';
import { DoctorDiagnosis } from './doctor_diagnosis.entity';
import { Medicine } from './medicine.entity';
import { Meridian } from './meridian.entity';
import { SelfTherapy } from './self_therapy.entity';
import { Therapy } from './therapy.entity';
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
];
