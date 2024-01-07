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
import { ComplaintService } from './complaint.service';
import { PaginationDTO } from 'src/dto/pagination.dto';
import { CreateComplaintDTO } from './dto/create_complaint.dto';
import { UpdateComplaintDTO } from './dto/update_complaint.dto';

@Controller('complaint')
export class ComplaintController {
  constructor(private complaintService: ComplaintService) {}

  @Get()
  async getAllWithPagination(
    @Query() paginationDTO: PaginationDTO,
    @Query('name') name: string,
    @Query('with-meridian') withMeridian: boolean,
  ) {
    if (name) {
      return await this.complaintService.findAllByName(name, withMeridian);
    }
    return await this.complaintService.getAllWithPagination(
      {
        ...paginationDTO,
      },
      withMeridian,
    );
  }

  @Get(':complaintId')
  async findById(
    @Param('complaintId') complaintId: number,
    @Query('with-meridian') withMeridian: boolean,
  ) {
    return await this.complaintService.findById(complaintId, withMeridian);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createComplaintDTO: CreateComplaintDTO) {
    return await this.complaintService.create({ ...createComplaintDTO });
  }

  @Put(':complaintId')
  async update(
    @Param('complaintId') complaintId: number,
    @Body() updateComplaintDTO: UpdateComplaintDTO,
  ) {
    return await this.complaintService.update(complaintId, {
      ...updateComplaintDTO,
    });
  }

  @Delete(':complaintId')
  async destroy(@Param('complaintId') complaintId: number) {
    await this.complaintService.destroy(complaintId);
  }
}
