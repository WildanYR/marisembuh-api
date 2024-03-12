import { Module } from '@nestjs/common';
import { DateUtility } from 'src/utils/date.util';
import { AbsenceAnalyticService } from './absence_analytic.service';
import { AbsenceAnalyticController } from './absence_analytic.controller';
import { PaginationUtility } from 'src/utils/pagination.util';
import {
  ABSENCE_REPOSITORY,
  CLINIC_REPOSITORY,
  SETTING_REPOSITORY,
  THERAPY_REPOSITORY,
  USER_REPOSITORY,
} from 'src/constants';
import { User } from 'src/entities/user.entity';
import { Absence } from 'src/entities/absence.entity';
import { Setting } from 'src/entities/setting.entity';
import { Therapy } from 'src/entities/therapy.entity';
import { TotalPatientAnalyticService } from './total_patient_analytic.service';
import { TotalPatientAnalyticController } from './total_patient_analytic.controller';
import { Clinic } from 'src/entities/clinic.entity';

@Module({
  providers: [
    PaginationUtility,
    DateUtility,
    { provide: USER_REPOSITORY, useValue: User },
    { provide: ABSENCE_REPOSITORY, useValue: Absence },
    { provide: SETTING_REPOSITORY, useValue: Setting },
    { provide: CLINIC_REPOSITORY, useValue: Clinic },
    { provide: THERAPY_REPOSITORY, useValue: Therapy },
    TotalPatientAnalyticService,
    AbsenceAnalyticService,
  ],
  controllers: [TotalPatientAnalyticController, AbsenceAnalyticController],
})
export class AnalyticModule {}
