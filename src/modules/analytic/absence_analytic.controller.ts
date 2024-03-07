import { Controller, Get, Param, Query } from '@nestjs/common';
import { AbsenceAnalyticService } from './absence_analytic.service';
import { AbsenceDateFilterDTO } from './dto/absence_date_filter.dto';
import { PaginationDTO } from 'src/dto/pagination.dto';

@Controller('analytic/absence')
export class AbsenceAnalyticController {
  constructor(private absenceAnalyticService: AbsenceAnalyticService) {}

  @Get()
  async getAbsenceAnalyticPagination(
    @Query() paginationDTO: PaginationDTO,
    @Query() dateFilterDTO: AbsenceDateFilterDTO,
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
    @Query() dateFilterDTO: AbsenceDateFilterDTO,
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
