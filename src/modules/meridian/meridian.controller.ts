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
import { MeridianService } from './meridian.service';
import { PaginationDTO } from 'src/dto/pagination.dto';
import { CreateMeridianDTO } from './dto/create_meridian.dto';
import { UpdateMeridianDTO } from './dto/update_meridian.dto';

@Controller('meridian')
export class MeridianController {
  constructor(private meridianService: MeridianService) {}

  @Get()
  async getAllWithPagination(
    @Query() paginationDTO: PaginationDTO,
    @Query('name') name: string,
    @Query('with-complaint') withComplaint: boolean,
  ) {
    if (name) {
      return await this.meridianService.findAllByName(name, withComplaint);
    }
    return await this.meridianService.getAllWithPagination(
      {
        ...paginationDTO,
      },
      withComplaint,
    );
  }

  @Get(':meridianId')
  async findById(
    @Param('meridianId') meridianId: number,
    @Query('with-complaint') withComplaint: boolean,
  ) {
    return await this.meridianService.findById(meridianId, withComplaint);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createMeridianDTO: CreateMeridianDTO) {
    return await this.meridianService.create({ ...createMeridianDTO });
  }

  @Put(':meridianId')
  async update(
    @Param('meridianId') meridianId: number,
    @Body() updateMeridianDTO: UpdateMeridianDTO,
  ) {
    return await this.meridianService.update(meridianId, {
      ...updateMeridianDTO,
    });
  }

  @Delete(':meridianId')
  async destroy(@Param('meridianId') meridianId: number) {
    await this.meridianService.destroy(meridianId);
  }
}
