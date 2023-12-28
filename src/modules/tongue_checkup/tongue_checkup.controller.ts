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
import { TongueCheckupService } from './tongue_checkup.service';
import { PaginationDTO } from 'src/dto/pagination.dto';
import { CreateTongueCheckupDTO } from './dto/create_tongue_checkup.dto';
import { UpdateTongueCheckupDTO } from './dto/update_tongue_checkup.dto';

@Controller('tongue-checkup')
export class TongueCheckupController {
  constructor(private tongueCheckupService: TongueCheckupService) {}

  @Get()
  async getAllWithPagination(
    @Query() paginationDTO: PaginationDTO,
    @Query('name') name: string,
  ) {
    if (name) {
      return await this.tongueCheckupService.findAllByName(name);
    }
    return await this.tongueCheckupService.getAllWithPagination({
      ...paginationDTO,
    });
  }

  @Get(':tongueCheckupId')
  async findById(@Param('tongueCheckupId') tongueCheckupId: number) {
    return await this.tongueCheckupService.findById(tongueCheckupId);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createTongueCheckupDTO: CreateTongueCheckupDTO) {
    return await this.tongueCheckupService.create({
      ...createTongueCheckupDTO,
    });
  }

  @Put(':tonguecheckupId')
  async update(
    @Param('tonguecheckupId') tonguecheckupId: number,
    @Body() updateTongueCheckupDTO: UpdateTongueCheckupDTO,
  ) {
    return await this.tongueCheckupService.update(tonguecheckupId, {
      ...updateTongueCheckupDTO,
    });
  }

  @Delete(':tonguecheckupId')
  async destroy(@Param('tonguecheckupId') tonguecheckupId: number) {
    await this.tongueCheckupService.destroy(tonguecheckupId);
  }
}
