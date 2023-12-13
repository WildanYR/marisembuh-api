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
import { StomachCheckupService } from './stomach_checkup.service';
import { PaginationDTO } from 'src/dto/pagination.dto';
import { CreateStomachCheckupDTO } from './dto/create_stomach_checkup.dto';
import { UpdateStomachCheckupDTO } from './dto/update_stomach_checkup.dto';

@Controller('stomach-checkup')
export class StomachCheckupController {
  constructor(private stomachCheckupService: StomachCheckupService) {}

  @Get()
  async getAllWithPagination(
    @Query() paginationDTO: PaginationDTO,
    @Query('name') name: string,
  ) {
    if (name) {
      return await this.stomachCheckupService.findAllByName(name);
    }
    return await this.stomachCheckupService.getAllWithPagination({
      ...paginationDTO,
    });
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createStomachCheckupDTO: CreateStomachCheckupDTO) {
    return await this.stomachCheckupService.create({
      ...createStomachCheckupDTO,
    });
  }

  @Put(':stomachcheckupId')
  async update(
    @Param('stomachcheckupId') stomachcheckupId: number,
    @Body() updateStomachCheckupDTO: UpdateStomachCheckupDTO,
  ) {
    return await this.stomachCheckupService.update(stomachcheckupId, {
      ...updateStomachCheckupDTO,
    });
  }

  @Delete(':stomachcheckupId')
  async destroy(@Param('stomachcheckupId') stomachcheckupId: number) {
    await this.stomachCheckupService.destroy(stomachcheckupId);
  }
}
