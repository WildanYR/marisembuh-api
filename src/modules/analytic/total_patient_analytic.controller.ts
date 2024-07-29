import { Controller, Get, Query } from '@nestjs/common';
import { TotalPatientAnalyticService } from './total_patient_analytic.service';
import { DateFilterDTO } from 'src/dto/date_filter.dto';
import { PaginationDTO } from 'src/dto/pagination.dto';

@Controller('analytic/total-patient')
export class TotalPatientAnalyticController {
  constructor(
    private totalPatientAnalyticService: TotalPatientAnalyticService,
  ) {}

  @Get('clinic')
  async getClinicPatientAnalytic(
    @Query() paginationDTO: PaginationDTO,
    @Query() dateFilterDTO: DateFilterDTO,
    @Query('s') name: string,
  ) {
    if (name) {
      return await this.totalPatientAnalyticService.getClinicAnalyticByName(
        name,
        { ...dateFilterDTO },
      );
    }
    return await this.totalPatientAnalyticService.getClinicAnalyticPagination(
      { ...paginationDTO },
      { ...dateFilterDTO },
    );
  }

  @Get('user')
  async getUserPatientAnalytic(
    @Query() paginationDTO: PaginationDTO,
    @Query() dateFilterDTO: DateFilterDTO,
    @Query('s') name: string,
  ) {
    if (name) {
      return await this.totalPatientAnalyticService.getUserAnalyticByName(
        name,
        { ...dateFilterDTO },
      );
    }
    return await this.totalPatientAnalyticService.getUserAnalyticPagination(
      { ...paginationDTO },
      { ...dateFilterDTO },
    );
  }

  @Get('therapy')
  async getTherapyPatientAnalytic(
    @Query() paginationDTO: PaginationDTO,
    @Query() dateFilterDTO: DateFilterDTO,
    @Query('s') name: string,
  ) {
    if (name) {
      return await this.totalPatientAnalyticService.getTherapyAnalyticByName(
        name,
        { ...dateFilterDTO },
      );
    }
    return await this.totalPatientAnalyticService.getTherapyAnalyticPagination(
      { ...paginationDTO },
      { ...dateFilterDTO },
    );
  }

  @Get('homecare')
  async getHomecarePatientAnalytic(@Query() dateFilterDTO: DateFilterDTO) {
    return await this.totalPatientAnalyticService.getHomecareAnalytic({
      ...dateFilterDTO,
    });
  }

  @Get('complaint')
  async getComplaintAnalytic(
    @Query() paginationDTO: PaginationDTO,
    @Query() dateFilterDTO: DateFilterDTO,
    @Query('s') name: string,
  ) {
    if (name) {
      return await this.totalPatientAnalyticService.getComplaintAnalyticByName(
        name,
        { ...dateFilterDTO },
      );
    }
    return await this.totalPatientAnalyticService.getComplaintAnalytic(
      { ...paginationDTO },
      { ...dateFilterDTO },
    );
  }

  @Get('doctor-diagnosis')
  async getDoctorDiagnosisAnalytic(
    @Query() paginationDTO: PaginationDTO,
    @Query() dateFilterDTO: DateFilterDTO,
    @Query('s') name: string,
  ) {
    if (name) {
      return await this.totalPatientAnalyticService.getDoctorDiagnosisAnalyticByName(
        name,
        { ...dateFilterDTO },
      );
    }
    return await this.totalPatientAnalyticService.getDoctorDiagnosisAnalytic(
      { ...paginationDTO },
      { ...dateFilterDTO },
    );
  }
}
