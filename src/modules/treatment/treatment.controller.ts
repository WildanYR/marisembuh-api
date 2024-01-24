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
import { TreatmentService } from './treatment.service';
import { PaginationDTO } from 'src/dto/pagination.dto';
import { CreateTreatmentDTO } from './dto/create_treatment.dto';

@Controller('treatment')
export class TreatmentController {
  constructor(private treatmentService: TreatmentService) {}

  @Get('patient/:patientId')
  async getAllPatientTreatment(
    @Param('patientId') patientId: number,
    @Query() paginationDTO: PaginationDTO,
    @Query('with-relation') withRelation: boolean,
  ) {
    return await this.treatmentService.getAllWithPagination(
      patientId,
      {
        ...paginationDTO,
      },
      withRelation || false,
    );
  }

  @Get(':treatmentId')
  async findById(@Param('treatmentId') treatmentId: number) {
    return await this.treatmentService.findById(treatmentId);
  }

  @Post()
  async create(@Body() createTreatmentDTO: CreateTreatmentDTO) {
    await this.treatmentService.create({ ...createTreatmentDTO });
  }

  @Put(':treatmentId')
  async update(
    @Param('treatmentId') treatmentId: number,
    @Body() updateTreatmentDTO,
  ) {
    await this.treatmentService.update(treatmentId, updateTreatmentDTO);
  }

  @Delete(':treatmentId')
  async destroy(@Param('treatmentId') treatmentId: number) {
    await this.treatmentService.destroy(treatmentId);
  }
}
