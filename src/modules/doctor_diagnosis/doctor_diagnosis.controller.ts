import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { DoctorDiagnosisService } from './doctor_diagnosis.service';
import { PaginationDTO } from 'src/dto/pagination.dto';
import { CreateDoctorDiagnosisDTO } from './dto/create_doctor_diagnosis.dto';
import { UpdateDoctorDiagnosisDTO } from './dto/update_doctor_diagnosis.dto';

@Controller('doctor-diagnosis')
export class DoctorDiagnosisController {
  constructor(private doctorDiagnosisService: DoctorDiagnosisService) {}

  @Get()
  async getAllWithPagination(
    @Query() paginationDTO: PaginationDTO,
    @Query('name') name: string,
  ) {
    if (name) {
      return await this.doctorDiagnosisService.findAllByName(name);
    }
    return await this.doctorDiagnosisService.getAllWithPagination({
      ...paginationDTO,
    });
  }

  @Get(':doctorDiagnosisId')
  async findById(@Param('doctorDiagnosisId') doctorDiagnosisId: number) {
    return await this.doctorDiagnosisService.findById(doctorDiagnosisId);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createDoctorDiagnosisDTO: CreateDoctorDiagnosisDTO) {
    return await this.doctorDiagnosisService.create({
      ...createDoctorDiagnosisDTO,
    });
  }

  @Put(':doctordiagnosisId')
  async update(
    @Param('doctordiagnosisId') doctordiagnosisId: number,
    @Body() updateDoctorDiagnosisDTO: UpdateDoctorDiagnosisDTO,
  ) {
    return await this.doctorDiagnosisService.update(doctordiagnosisId, {
      ...updateDoctorDiagnosisDTO,
    });
  }

  @Delete(':doctordiagnosisId')
  async destroy(@Param('doctordiagnosisId') doctordiagnosisId: number) {
    await this.doctorDiagnosisService.destroy(doctordiagnosisId);
  }
}
