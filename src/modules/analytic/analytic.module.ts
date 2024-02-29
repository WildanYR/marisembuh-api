import { Module } from '@nestjs/common';
import { DateUtility } from 'src/utils/date.util';
import { ClinicAnalyticService } from './clinic_analytic.service';
import { ClinicAnalyticController } from './clinic_analytic.controller';

@Module({
  providers: [DateUtility, ClinicAnalyticService],
  controllers: [ClinicAnalyticController],
})
export class AnalyticModule {}
