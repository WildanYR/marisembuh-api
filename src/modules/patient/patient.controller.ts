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
import { PatientService } from './patient.service';
import { PaginationDTO } from 'src/dto/pagination.dto';
import { CreatePatientDTO } from './dto/create_patient.dto';
import { UpdatePatientDTO } from './dto/update_patient_dto';
import { PatientMapService } from './patient_map.service';

@Controller('patient')
export class PatientController {
  constructor(
    private patientService: PatientService,
    private patientMapService: PatientMapService,
  ) {}

  @Get()
  async getAllWithPagination(
    @Query() paginationDTO: PaginationDTO,
    @Query('s') search: string,
  ) {
    if (search) {
      const patients = await this.patientService.getByNameOrRM(search);
      return this.patientMapService.mapMany(patients);
    }
    const { items, ...pagination } =
      await this.patientService.getAllWithPagination({ ...paginationDTO });
    const patientMaps = this.patientMapService.mapMany(items);
    return { ...pagination, items: patientMaps };
  }

  @Get(':patientId')
  async findById(@Param('patientId') patientId: number) {
    const patient = await this.patientService.findById(patientId);
    return this.patientMapService.mapOne(patient);
  }

  @Post()
  async create(@Body() createPatientDTO: CreatePatientDTO) {
    return await this.patientService.create({ ...createPatientDTO });
  }

  @Put(':patientId')
  async update(
    @Param('patientId') patientId: number,
    @Body() updatePatientDTO: UpdatePatientDTO,
  ) {
    return await this.patientService.update(patientId, { ...updatePatientDTO });
  }

  @Delete(':patientId')
  async destroy(@Param('patientId') patientId: number) {
    await this.patientService.destroy(patientId);
  }
}
