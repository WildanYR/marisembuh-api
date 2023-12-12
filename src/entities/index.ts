import { Clinic } from './clinic.entity';
import { DoctorDiagnosis } from './doctor_diagnosis.entity';
import { Medicine } from './medicine.entity';
import { SelfTherapy } from './self_therapy.entity';
import { User } from './user.entity';

export default () => [User, Clinic, Medicine, DoctorDiagnosis, SelfTherapy];
