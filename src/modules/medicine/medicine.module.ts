import { Module } from '@nestjs/common';
import { MEDICINE_REPOSITORY } from 'src/constants';
import { Medicine } from 'src/entities/medicine.entity';
import { PaginationUtility } from 'src/utils/pagination.util';
import { MedicineController } from './medicine.controller';
import { MedicineService } from './medicine.service';

@Module({
  providers: [
    PaginationUtility,
    { provide: MEDICINE_REPOSITORY, useValue: Medicine },
    MedicineService,
  ],
  controllers: [MedicineController],
})
export class MedicineModule {}
