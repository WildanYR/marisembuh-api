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
import { DurationAdviceService } from './duration_advice.service';
import { PaginationDTO } from 'src/dto/pagination.dto';
import { CreateDurationAdviceDTO } from './dto/create_duration_advice.dto';
import { UpdateDurationAdviceDTO } from './dto/update_duration_advice.dto';

@Controller('duration-advice')
export class DurationAdviceController {
  constructor(private durationAdviceService: DurationAdviceService) {}

  @Get()
  async getAllWithPagination(
    @Query() paginationDTO: PaginationDTO,
    @Query('name') name: string,
  ) {
    if (name) {
      return await this.durationAdviceService.findAllByName(name);
    }
    return await this.durationAdviceService.getAllWithPagination({
      ...paginationDTO,
    });
  }

  @Get(':durationAdviceId')
  async findById(@Param('durationAdviceId') durationAdviceId: number) {
    return await this.durationAdviceService.findById(durationAdviceId);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createDurationAdviceDTO: CreateDurationAdviceDTO) {
    return await this.durationAdviceService.create({
      ...createDurationAdviceDTO,
    });
  }

  @Put(':durationadviceId')
  async update(
    @Param('durationadviceId') durationadviceId: number,
    @Body() updateDurationAdviceDTO: UpdateDurationAdviceDTO,
  ) {
    return await this.durationAdviceService.update(durationadviceId, {
      ...updateDurationAdviceDTO,
    });
  }

  @Delete(':durationadviceId')
  async destroy(@Param('durationadviceId') durationadviceId: number) {
    await this.durationAdviceService.destroy(durationadviceId);
  }
}
