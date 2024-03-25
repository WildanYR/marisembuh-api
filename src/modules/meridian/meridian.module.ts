import { Module } from '@nestjs/common';
import { MERIDIAN_REPOSITORY } from 'src/constants/repository.const';
import { Meridian } from 'src/entities/meridian.entity';
import { PaginationUtility } from 'src/utils/pagination.util';
import { MeridianController } from './meridian.controller';
import { MeridianService } from './meridian.service';

@Module({
  providers: [
    PaginationUtility,
    { provide: MERIDIAN_REPOSITORY, useValue: Meridian },
    MeridianService,
  ],
  controllers: [MeridianController],
})
export class MeridianModule {}
