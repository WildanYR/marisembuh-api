import { Controller, Get, Query } from '@nestjs/common';
import { ClinicAnalyticService } from './clinic_analytic.service';

@Controller('analytic/clinic')
export class ClinicAnalyticController {
  constructor(private clinicAnalyticService: ClinicAnalyticService) {}

  @Get()
  async getClinicAnalytic(@Query('date') date: string) {
    return await this.clinicAnalyticService.getClinicAnalytic(date);
  }

  @Get('user')
  async getUserAnalytic(@Query('date') date: string) {
    return await this.clinicAnalyticService.getUserAnalytic(date);
  }
}
