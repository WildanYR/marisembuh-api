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
import { TherapyService } from './therapy.service';
import { PaginationDTO } from 'src/dto/pagination.dto';
import { CreateTherapyDTO } from './dto/create_therapy.dto';
import { UpdateTherapyDTO } from './dto/update_therapy.dto';

@Controller('therapy')
export class TherapyController {
  constructor(private therapyService: TherapyService) {}

  @Get()
  async getAllWithPagination(
    @Query() paginationDTO: PaginationDTO,
    @Query('s') name: string,
  ) {
    if (name) {
      return await this.therapyService.findAllByName(name);
    }
    return await this.therapyService.getAllWithPagination({ ...paginationDTO });
  }

  @Get(':therapyId')
  async findById(@Param('therapyId') therapyId: number) {
    return await this.therapyService.findById(therapyId);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createTherapyDTO: CreateTherapyDTO) {
    return await this.therapyService.create({ ...createTherapyDTO });
  }

  @Put(':therapyId')
  async update(
    @Param('therapyId') therapyId: number,
    @Body() updateTherapyDTO: UpdateTherapyDTO,
  ) {
    return await this.therapyService.update(therapyId, { ...updateTherapyDTO });
  }

  @Delete(':therapyId')
  async destroy(@Param('therapyId') therapyId: number) {
    await this.therapyService.destroy(therapyId);
  }
}
