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
        ...dateFilterDTO,
      });
    }
    return await this.absenceAnalyticService.getAbsenceAnalyticPagination(
      { ...paginationDTO },
      { ...dateFilterDTO },
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
      { ...dateFilterDTO },
    );
  }
}
