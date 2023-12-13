import { Module } from '@nestjs/common';
import { PaginationUtility } from 'src/utils/pagination.util';
import { PatientService } from './patient.service';
import { PATIENT_REPOSITORY } from 'src/constants';
import { Patient } from 'src/entities/patient.entity';
import { PatientController } from './patient.controller';
import { PatientMapService } from './patient_map.service';

@Module({
  providers: [
    PaginationUtility,
    PatientService,
    PatientMapService,
    { provide: PATIENT_REPOSITORY, useValue: Patient },
  ],
  controllers: [PatientController],
})
export class PatientModule {}
