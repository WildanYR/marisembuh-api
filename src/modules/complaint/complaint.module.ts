import { Module } from '@nestjs/common';
import { COMPLAINT_REPOSITORY } from 'src/constants/repository.const';
import { Complaint } from 'src/entities/complaint.entity';
import { PaginationUtility } from 'src/utils/pagination.util';
import { ComplaintController } from './complaint.controller';
import { ComplaintService } from './complaint.service';

@Module({
  providers: [
    PaginationUtility,
    { provide: COMPLAINT_REPOSITORY, useValue: Complaint },
    ComplaintService,
  ],
  controllers: [ComplaintController],
})
export class ComplaintModule {}
