import { Controller, Get, Query } from '@nestjs/common';
import { PatientAnalyticService } from './patient_analytic.service';
import { PaginationDTO } from 'src/dto/pagination.dto';
import { DateFilterDTO } from 'src/dto/date_filter.dto';

@Controller('analytic/patient')
export class PatientAnalyticController {
  constructor(private patientAnalyticService: PatientAnalyticService) {}

  @Get()
  async getPatientAnalyticPagination(
    @Query() paginationDTO: PaginationDTO,
    @Query() dateFilterDTO: DateFilterDTO,
    @Query('s') search: string,
    @Query('sort') sort: string,
  ) {
    if (search) {
      return await this.patientAnalyticService.getPatientAnalyticByName(
        search,
        { ...dateFilterDTO },
      );
    }

    return await this.patientAnalyticService.getPatientAnalyticPagination(
      { ...paginationDTO },
      { ...dateFilterDTO },
      sort,
    );
  }

  @Get('summary')
  async getPatientAnalyticSummary(@Query() dateFilterDTO: DateFilterDTO) {
    return await this.patientAnalyticService.getPatientAnalyticSummary({
      ...dateFilterDTO,
    });
  }
}
