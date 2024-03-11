import { Controller, Get, Param, Query } from '@nestjs/common';
import { AbsenceAnalyticService } from './absence_analytic.service';
import { PaginationDTO } from 'src/dto/pagination.dto';
import { DateFilterDTO } from 'src/dto/date_filter.dto';

@Controller('analytic/absence')
export class AbsenceAnalyticController {
  constructor(private absenceAnalyticService: AbsenceAnalyticService) {}

  @Get()
  async getAbsenceAnalyticPagination(
    @Query() paginationDTO: PaginationDTO,
    @Query() dateFilterDTO: DateFilterDTO,
    @Query('clinic_id') clinicId: number,
    @Query('s') search: string,
  ) {
    if (search) {
      return this.absenceAnalyticService.getAbsenceAnalyticByName(search, {
        start_date: new Date(dateFilterDTO.start_date),
        end_date: new Date(dateFilterDTO.end_date),
      });
    }
    return await this.absenceAnalyticService.getAbsenceAnalyticPagination(
      { ...paginationDTO },
      {
        start_date: new Date(dateFilterDTO.start_date),
        end_date: new Date(dateFilterDTO.end_date),
      },
      clinicId,
    );
  }

  @Get('user/:userId')
  async getAbsenceAnalyticDetail(
    @Param('userId') userId: number,
    @Query() paginationDTO: PaginationDTO,
    @Query() dateFilterDTO: DateFilterDTO,
  ) {
    return await this.absenceAnalyticService.getAbsenceAnalyticDetail(
      { ...paginationDTO },
      userId,
      {
        start_date: new Date(dateFilterDTO.start_date),
        end_date: new Date(dateFilterDTO.end_date),
      },
    );
  }
}
