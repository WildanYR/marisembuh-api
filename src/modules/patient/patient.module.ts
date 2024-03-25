import { Module } from '@nestjs/common';
import { PaginationUtility } from 'src/utils/pagination.util';
import { PatientService } from './patient.service';
import {
  PATIENT_REPOSITORY,
  TREATMENT_REPOSITORY,
} from 'src/constants/repository.const';
import { Patient } from 'src/entities/patient.entity';
import { PatientController } from './patient.controller';
import { PatientMapService } from './patient_map.service';
import { Treatment } from 'src/entities/treatment.entity';
import { DateUtility } from 'src/utils/date.util';

@Module({
  providers: [
    PaginationUtility,
    DateUtility,
    PatientService,
    PatientMapService,
    { provide: PATIENT_REPOSITORY, useValue: Patient },
    { provide: TREATMENT_REPOSITORY, useValue: Treatment },
  ],
  controllers: [PatientController],
})
export class PatientModule {}
