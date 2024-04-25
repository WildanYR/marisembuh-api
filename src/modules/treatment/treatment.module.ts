import { Module } from '@nestjs/common';
import { TreatmentService } from './treatment.service';
import { TreatmentController } from './treatment.controller';
import { Treatment } from 'src/entities/treatment.entity';
import { TreatmentDoctorDiagnosis } from 'src/entities/treatment_doctor_diagnosis.entity';
import { TreatmentMedicine } from 'src/entities/treatment_medicine.entity';
import { TreatmentTherapyHistory } from 'src/entities/treatment_therapy_history.entity';
import { TreatmentComplaint } from 'src/entities/treatment_complaint.entity';
import { TreatmentStomachCheckup } from 'src/entities/treatment_stomach_checkup.entity';
import { TreatmentSelfTherapy } from 'src/entities/treatment_self_therapy.entity';
import { TreatmentTherapy } from 'src/entities/treatment_therapy.entity';
import { TreatmentPulseCheckup } from 'src/entities/treatment_pulse_checkup.entity';
import { TreatmentTongueCheckup } from 'src/entities/treatment_tongue_checkup.entity';
import { PaginationUtility } from 'src/utils/pagination.util';
import {
  TREATMENT_REPOSITORY,
  TREATMENT_DOCTOR_DIAGNOSIS_REPOSITORY,
  TREATMENT_MEDICINE_REPOSITORY,
  TREATMENT_THERAPY_HISTORY_REPOSITORY,
  TREATMENT_COMPLAINT_REPOSITORY,
  TREATMENT_STOMACH_CHECKUP_REPOSITORY,
  TREATMENT_TONGUE_CHECKUP_REPOSITORY,
  TREATMENT_PULSE_CHECKUP_REPOSITORY,
  TREATMENT_THERAPY_REPOSITORY,
  TREATMENT_SELF_THERAPY_REPOSITORY,
  PATIENT_ARRIVAL_REPOSITORY,
} from 'src/constants/repository.const';
import { PatientArrival } from 'src/entities/patient_arrival.entity';

@Module({
  providers: [
    PaginationUtility,
    TreatmentService,
    { provide: TREATMENT_REPOSITORY, useValue: Treatment },
    {
      provide: TREATMENT_DOCTOR_DIAGNOSIS_REPOSITORY,
      useValue: TreatmentDoctorDiagnosis,
    },
    {
      provide: TREATMENT_MEDICINE_REPOSITORY,
      useValue: TreatmentMedicine,
    },
    {
      provide: TREATMENT_THERAPY_HISTORY_REPOSITORY,
      useValue: TreatmentTherapyHistory,
    },
    {
      provide: TREATMENT_COMPLAINT_REPOSITORY,
      useValue: TreatmentComplaint,
    },
    {
      provide: TREATMENT_STOMACH_CHECKUP_REPOSITORY,
      useValue: TreatmentStomachCheckup,
    },
    {
      provide: TREATMENT_TONGUE_CHECKUP_REPOSITORY,
      useValue: TreatmentTongueCheckup,
    },
    {
      provide: TREATMENT_PULSE_CHECKUP_REPOSITORY,
      useValue: TreatmentPulseCheckup,
    },
    {
      provide: TREATMENT_THERAPY_REPOSITORY,
      useValue: TreatmentTherapy,
    },
    {
      provide: TREATMENT_SELF_THERAPY_REPOSITORY,
      useValue: TreatmentSelfTherapy,
    },
    {
      provide: PATIENT_ARRIVAL_REPOSITORY,
      useValue: PatientArrival,
    },
  ],
  controllers: [TreatmentController],
})
export class TreatmentModule {}
