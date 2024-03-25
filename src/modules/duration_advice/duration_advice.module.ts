import { Module } from '@nestjs/common';
import { DURATION_ADVICE_REPOSITORY } from 'src/constants/repository.const';
import { DurationAdvice } from 'src/entities/duration_advice.entity';
import { PaginationUtility } from 'src/utils/pagination.util';
import { DurationAdviceController } from './duration_advice.controller';
import { DurationAdviceService } from './duration_advice.service';

@Module({
  providers: [
    PaginationUtility,
    { provide: DURATION_ADVICE_REPOSITORY, useValue: DurationAdvice },
    DurationAdviceService,
  ],
  controllers: [DurationAdviceController],
})
export class DurationAdviceModule {}
