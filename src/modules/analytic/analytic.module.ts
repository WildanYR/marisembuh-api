import { Module } from '@nestjs/common';
import { DateUtility } from 'src/utils/date.util';
import { ClinicAnalyticService } from './clinic_analytic.service';
import { ClinicAnalyticController } from './clinic_analytic.controller';
import { AbsenceAnalyticService } from './absence_analytic.service';
import { AbsenceAnalyticController } from './absence_analytic.controller';
import { PaginationUtility } from 'src/utils/pagination.util';
import {
  ABSENCE_REPOSITORY,
  SETTING_REPOSITORY,
  USER_REPOSITORY,
} from 'src/constants';
import { User } from 'src/entities/user.entity';
import { Absence } from 'src/entities/absence.entity';
import { Setting } from 'src/entities/setting.entity';

@Module({
  providers: [
    PaginationUtility,
    DateUtility,
    { provide: USER_REPOSITORY, useValue: User },
    { provide: ABSENCE_REPOSITORY, useValue: Absence },
    { provide: SETTING_REPOSITORY, useValue: Setting },
    ClinicAnalyticService,
    AbsenceAnalyticService,
  ],
  controllers: [ClinicAnalyticController, AbsenceAnalyticController],
})
export class AnalyticModule {}
