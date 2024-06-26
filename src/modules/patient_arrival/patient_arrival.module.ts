import { Module } from '@nestjs/common';
import { PATIENT_ARRIVAL_REPOSITORY } from 'src/constants/repository.const';
import { PatientArrival } from 'src/entities/patient_arrival.entity';
import { PaginationUtility } from 'src/utils/pagination.util';
import { PatientArrivalController } from './patient_arrival.controller';
import { PatientArrivalService } from './patient_arrival.service';
import { DateUtility } from 'src/utils/date.util';

@Module({
  providers: [
    PaginationUtility,
    DateUtility,
    { provide: PATIENT_ARRIVAL_REPOSITORY, useValue: PatientArrival },
    PatientArrivalService,
  ],
  controllers: [PatientArrivalController],
})
export class PatientArrivalModule {}
