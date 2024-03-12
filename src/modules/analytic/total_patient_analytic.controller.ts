import { Controller, Get, Query } from '@nestjs/common';
import { TotalPatientAnalyticService } from './total_patient_analytic.service';
import { DateFilterDTO } from 'src/dto/date_filter.dto';
import { PaginationDTO } from 'src/dto/pagination.dto';

@Controller('analytic/total-patient')
export class TotalPatientAnalyticController {
  constructor(
    private totalPatientAnalyticService: TotalPatientAnalyticService,
  ) {}

  @Get('therapy')
  async getTherapyPatientAnalytic(
    @Query() paginationDTO: PaginationDTO,
    @Query() dateFilterDTO: DateFilterDTO,
    @Query('s') name: string,
  ) {
    if (name) {
      return await this.totalPatientAnalyticService.getTherapyAnalyticByName(
        name,
        {
          start_date: new Date(dateFilterDTO.start_date),
          end_date: new Date(dateFilterDTO.end_date),
        },
      );
    }
    return await this.totalPatientAnalyticService.getTherapyAnalyticPagination(
      { ...paginationDTO },
      {
        start_date: new Date(dateFilterDTO.start_date),
        end_date: new Date(dateFilterDTO.end_date),
      },
    );
  }
}
