import { Module } from '@nestjs/common';
import { TONGUE_CHECKUP_REPOSITORY } from 'src/constants';
import { TongueCheckup } from 'src/entities/tongue_checkup.entity';
import { PaginationUtility } from 'src/utils/pagination.util';
import { TongueCheckupController } from './tongue_checkup.controller';
import { TongueCheckupService } from './tongue_checkup.service';

@Module({
  providers: [
    PaginationUtility,
    { provide: TONGUE_CHECKUP_REPOSITORY, useValue: TongueCheckup },
    TongueCheckupService,
  ],
  controllers: [TongueCheckupController],
})
export class TongueCheckupModule {}
