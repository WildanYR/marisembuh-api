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
import { SelfTherapyService } from './self_therapy.service';
import { PaginationDTO } from 'src/dto/pagination.dto';
import { CreateSelfTherapyDTO } from './dto/create_self_therapy.dto';
import { UpdateSelfTherapyDTO } from './dto/update_self_therapy.dto';

@Controller('self-therapy')
export class SelfTherapyController {
  constructor(private selfTherapyService: SelfTherapyService) {}

  @Get()
  async getAllWithPagination(
    @Query() paginationDTO: PaginationDTO,
    @Query('name') name: string,
  ) {
    if (name) {
      return await this.selfTherapyService.findAllByName(name);
    }
    return await this.selfTherapyService.getAllWithPagination({
      ...paginationDTO,
    });
  }

  @Get(':selfTherapyId')
  async findById(@Param('selfTherapyId') selfTherapyId: number) {
    return await this.selfTherapyService.findById(selfTherapyId);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createSelfTherapyDTO: CreateSelfTherapyDTO) {
    return await this.selfTherapyService.create({
      ...createSelfTherapyDTO,
    });
  }

  @Put(':selftherapyId')
  async update(
    @Param('selftherapyId') selftherapyId: number,
    @Body() updateSelfTherapyDTO: UpdateSelfTherapyDTO,
  ) {
    return await this.selfTherapyService.update(selftherapyId, {
      ...updateSelfTherapyDTO,
    });
  }

  @Delete(':selftherapyId')
  async destroy(@Param('selftherapyId') selftherapyId: number) {
    await this.selfTherapyService.destroy(selftherapyId);
  }
}
