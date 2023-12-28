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
import { ClinicService } from './clinic.service';
import { PaginationDTO } from 'src/dto/pagination.dto';
import { CreateClinicDTO } from './dto/create_clinic.dto';
import { UpdateClinicDTO } from './dto/update_clinic.dto';

@Controller('clinic')
export class ClinicController {
  constructor(private clinicService: ClinicService) {}

  @Get()
  async getAllWithPagination(
    @Query() paginationDTO: PaginationDTO,
    @Query('s') name: string,
  ) {
    if (name) {
      return await this.clinicService.findAllByName(name);
    }
    return await this.clinicService.getAllWithPagination({ ...paginationDTO });
  }

  @Get(':clinicId')
  async findById(@Param('clinicId') clinicId: number) {
    return await this.clinicService.findById(clinicId);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createClinicDTO: CreateClinicDTO) {
    return await this.clinicService.create({ ...createClinicDTO });
  }

  @Put(':clinicId')
  async update(
    @Param('clinicId') clinicId: number,
    @Body() updateClinicDTO: UpdateClinicDTO,
  ) {
    return await this.clinicService.update(clinicId, { ...updateClinicDTO });
  }

  @Delete(':clinicId')
  async destroy(@Param('clinicId') clinicId: number) {
    await this.clinicService.destroy(clinicId);
  }
}
