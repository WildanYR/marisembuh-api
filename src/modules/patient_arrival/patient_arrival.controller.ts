import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PatientArrivalService } from './patient_arrival.service';
import { PaginationDTO } from 'src/dto/pagination.dto';
import { CreatePatientArrivalDTO } from './dto/create_patient_arrival.dto';
import { UpdatePatientArrivalDTO } from './dto/update_patient_arrival.dto';
import { GetPatientArrivalQueryDTO } from './dto/get_patient_arrival_query.dto';

@Controller('patient-arrival')
export class PatientArrivalController {
  constructor(private patientArrivalService: PatientArrivalService) {}

  @Get()
  async getAllPatientArrival(
    @Query() paginationDTO: PaginationDTO,
    @Query() filterDTO: GetPatientArrivalQueryDTO,
  ) {
    return await this.patientArrivalService.getAllWithPagination(
      {
        ...paginationDTO,
      },
      { ...filterDTO },
    );
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.patientArrivalService.getById(id);
  }

  @Post()
  async create(@Body() createPatientArrivalDTO: CreatePatientArrivalDTO) {
    await this.patientArrivalService.create({
      ...createPatientArrivalDTO,
    });
  }

  @Put(':patientArrivalId')
  async update(
    @Param('patientArrivalId') patientArrivalId: number,
    @Body() updateTreatmentDTO: UpdatePatientArrivalDTO,
  ) {
    await this.patientArrivalService.update(
      patientArrivalId,
      updateTreatmentDTO,
    );
  }

  @Delete(':patientArrivalId')
  async destroy(@Param('patientArrivalId') patientArrivalId: number) {
    await this.patientArrivalService.destroy(patientArrivalId);
  }
}
