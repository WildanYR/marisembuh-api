import { Module } from '@nestjs/common';
import { ABSENCE_REPOSITORY } from 'src/constants';
import { Absence } from 'src/entities/absence.entity';
import { AbsenceService } from './absence.service';
import { AbsenceController } from './absence.controller';
import { DateUtility } from 'src/utils/date.util';

@Module({
  providers: [
    DateUtility,
    { provide: ABSENCE_REPOSITORY, useValue: Absence },
    AbsenceService,
  ],
  controllers: [AbsenceController],
})
export class AbsenceModule {}
