import { Module } from '@nestjs/common';
import { THERAPY_REPOSITORY } from 'src/constants/repository.const';
import { Therapy } from 'src/entities/therapy.entity';
import { PaginationUtility } from 'src/utils/pagination.util';
import { TherapyController } from './therapy.controller';
import { TherapyService } from './therapy.service';

@Module({
  providers: [
    PaginationUtility,
    { provide: THERAPY_REPOSITORY, useValue: Therapy },
    TherapyService,
  ],
  controllers: [TherapyController],
})
export class TherapyModule {}
