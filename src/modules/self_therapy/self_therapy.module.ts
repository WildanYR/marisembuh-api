import { Module } from '@nestjs/common';
import { SELF_THERAPY_REPOSITORY } from 'src/constants/repository.const';
import { SelfTherapy } from 'src/entities/self_therapy.entity';
import { PaginationUtility } from 'src/utils/pagination.util';
import { SelfTherapyController } from './self_therapy.controller';
import { SelfTherapyService } from './self_therapy.service';

@Module({
  providers: [
    PaginationUtility,
    { provide: SELF_THERAPY_REPOSITORY, useValue: SelfTherapy },
    SelfTherapyService,
  ],
  controllers: [SelfTherapyController],
})
export class SelfTherapyModule {}
