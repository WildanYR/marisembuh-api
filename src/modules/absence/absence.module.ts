import { Module } from '@nestjs/common';
import { ABSENCE_REPOSITORY } from 'src/constants';
import { Absence } from 'src/entities/absence.entity';
import { AbsenceService } from './absence.service';
import { AbsenceController } from './absence.controller';

@Module({
  providers: [
    { provide: ABSENCE_REPOSITORY, useValue: Absence },
    AbsenceService,
  ],
  controllers: [AbsenceController],
})
export class AbsenceModule {}
