import { Absence } from './absence.entity';
import { Clinic } from './clinic.entity';
import { Complaint } from './complaint.entity';
import { DoctorDiagnosis } from './doctor_diagnosis.entity';
import { DurationAdvice } from './duration_advice.entity';
import { Medicine } from './medicine.entity';
import { Meridian } from './meridian.entity';
import { Patient } from './patient.entity';
import { PatientArrival } from './patient_arrival.entity';
import { SelfTherapy } from './self_therapy.entity';
import { Setting } from './setting.entity';
import { StomachCheckup } from './stomach_checkup.entity';
import { Therapy } from './therapy.entity';
import { TongueCheckup } from './tongue_checkup.entity';
import { Treatment } from './treatment.entity';
import { TreatmentComplaint } from './treatment_complaint.entity';
import { TreatmentDoctorDiagnosis } from './treatment_doctor_diagnosis.entity';
import { TreatmentMedicine } from './treatment_medicine.entity';
import { TreatmentPacket } from './treatment_packet.entity';
import { TreatmentPulseCheckup } from './treatment_pulse_checkup.entity';
import { TreatmentSelfTherapy } from './treatment_self_therapy.entity';
import { TreatmentStomachCheckup } from './treatment_stomach_checkup.entity';
import { TreatmentTherapy } from './treatment_therapy.entity';
import { TreatmentTherapyHistory } from './treatment_therapy_history.entity';
import { TreatmentTongueCheckup } from './treatment_tongue_checkup.entity';
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
  Treatment,
  TreatmentDoctorDiagnosis,
  TreatmentMedicine,
  TreatmentTherapyHistory,
  TreatmentComplaint,
  TreatmentStomachCheckup,
  TreatmentTongueCheckup,
  TreatmentPulseCheckup,
  TreatmentTherapy,
  TreatmentSelfTherapy,
  Absence,
  Setting,
  PatientArrival,
];
