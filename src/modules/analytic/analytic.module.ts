import { Module } from '@nestjs/common';
import { DateUtility } from 'src/utils/date.util';
import { AbsenceAnalyticService } from './absence_analytic.service';
import { AbsenceAnalyticController } from './absence_analytic.controller';
import { PaginationUtility } from 'src/utils/pagination.util';
import { User } from 'src/entities/user.entity';
import { Absence } from 'src/entities/absence.entity';
import { Setting } from 'src/entities/setting.entity';
import { Therapy } from 'src/entities/therapy.entity';
import { TotalPatientAnalyticService } from './total_patient_analytic.service';
import { TotalPatientAnalyticController } from './total_patient_analytic.controller';
import { Clinic } from 'src/entities/clinic.entity';
import {
  USER_REPOSITORY,
  ABSENCE_REPOSITORY,
  SETTING_REPOSITORY,
  CLINIC_REPOSITORY,
  THERAPY_REPOSITORY,
  TREATMENT_REPOSITORY,
  PATIENT_REPOSITORY,
} from 'src/constants/repository.const';
import { Treatment } from 'src/entities/treatment.entity';
import { PatientAnalyticService } from './patient_analytic.service';
import { PatientAnalyticController } from './patient_analytic.controller';
import { Patient } from 'src/entities/patient.entity';

@Module({
  providers: [
    PaginationUtility,
    DateUtility,
    { provide: USER_REPOSITORY, useValue: User },
    { provide: ABSENCE_REPOSITORY, useValue: Absence },
    { provide: SETTING_REPOSITORY, useValue: Setting },
    { provide: CLINIC_REPOSITORY, useValue: Clinic },
    { provide: THERAPY_REPOSITORY, useValue: Therapy },
    { provide: TREATMENT_REPOSITORY, useValue: Treatment },
    { provide: PATIENT_REPOSITORY, useValue: Patient },
    TotalPatientAnalyticService,
    AbsenceAnalyticService,
    PatientAnalyticService,
  ],
  controllers: [
    TotalPatientAnalyticController,
    AbsenceAnalyticController,
    PatientAnalyticController,
  ],
})
export class AnalyticModule {}
