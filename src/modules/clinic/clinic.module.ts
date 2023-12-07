import { Module } from '@nestjs/common';
import { CLINIC_REPOSITORY } from 'src/constants';
import { Clinic } from 'src/entities/clinic.entity';
import { PaginationUtility } from 'src/utils/pagination.util';
import { ClinicController } from './clinic.controller';
import { ClinicService } from './clinic.service';

@Module({
  providers: [
    PaginationUtility,
    { provide: CLINIC_REPOSITORY, useValue: Clinic },
    ClinicService,
  ],
  controllers: [ClinicController],
})
export class ClinicModule {}
