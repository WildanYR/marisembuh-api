import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AbsenceService } from './absence.service';
import { RequestAbsenceDTO } from './dto/request_absence.dto';

@Controller('absence')
export class AbsenceController {
  constructor(private absenceService: AbsenceService) {}

  @Get(':userId/check')
  async checkAbsence(@Param('userId') userId: number) {
    return await this.absenceService.checkAbsence(userId);
  }

  @Post(':userId')
  async handleAbsence(
    @Param('userId') userId: number,
    @Body() requestAbsenceDTO: RequestAbsenceDTO,
  ) {
    return await this.absenceService.handleAbsence(
      userId,
      requestAbsenceDTO.type,
      requestAbsenceDTO.data,
    );
  }

  @Put(':userId/finish')
  async finishWork(@Param('userId') userId: number) {
    return await this.absenceService.finishWork(userId);
  }
}
