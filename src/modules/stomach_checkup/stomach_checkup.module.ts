import { Module } from '@nestjs/common';
import { STOMACH_CHECKUP_REPOSITORY } from 'src/constants/repository.const';
import { StomachCheckup } from 'src/entities/stomach_checkup.entity';
import { PaginationUtility } from 'src/utils/pagination.util';
import { StomachCheckupController } from './stomach_checkup.controller';
import { StomachCheckupService } from './stomach_checkup.service';

@Module({
  providers: [
    PaginationUtility,
    { provide: STOMACH_CHECKUP_REPOSITORY, useValue: StomachCheckup },
    StomachCheckupService,
  ],
  controllers: [StomachCheckupController],
})
export class StomachCheckupModule {}
