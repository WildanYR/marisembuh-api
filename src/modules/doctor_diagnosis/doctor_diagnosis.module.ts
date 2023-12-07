import { Module } from '@nestjs/common';
import { DOCTOR_DIAGNOSIS_REPOSITORY } from 'src/constants';
import { DoctorDiagnosis } from 'src/entities/doctor_diagnosis.entity';
import { PaginationUtility } from 'src/utils/pagination.util';
import { DoctorDiagnosisController } from './doctor_diagnosis.controller';
import { DoctorDiagnosisService } from './doctor_diagnosis.service';

@Module({
  providers: [
    PaginationUtility,
    { provide: DOCTOR_DIAGNOSIS_REPOSITORY, useValue: DoctorDiagnosis },
    DoctorDiagnosisService,
  ],
  controllers: [DoctorDiagnosisController],
})
export class DoctorDiagnosisModule {}
