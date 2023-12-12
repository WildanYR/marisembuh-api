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
import { TreatmentPacketService } from './treatment_packet.service';
import { PaginationDTO } from 'src/dto/pagination.dto';
import { CreateTreatmentPacketDTO } from './dto/create_treatment_packet.dto';
import { UpdateTreatmentPacketDTO } from './dto/update_treatment_packet.dto';

@Controller('treatment-packet')
export class TreatmentPacketController {
  constructor(private treatmentPacketService: TreatmentPacketService) {}

  @Get()
  async getAllWithPagination(
    @Query() paginationDTO: PaginationDTO,
    @Query('name') name: string,
  ) {
    if (name) {
      return await this.treatmentPacketService.findAllByName(name);
    }
    return await this.treatmentPacketService.getAllWithPagination({
      ...paginationDTO,
    });
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createTreatmentPacketDTO: CreateTreatmentPacketDTO) {
    return await this.treatmentPacketService.create({
      ...createTreatmentPacketDTO,
    });
  }

  @Put(':treatmentpacketId')
  async update(
    @Param('treatmentpacketId') treatmentpacketId: number,
    @Body() updateTreatmentPacketDTO: UpdateTreatmentPacketDTO,
  ) {
    return await this.treatmentPacketService.update(treatmentpacketId, {
      ...updateTreatmentPacketDTO,
    });
  }

  @Delete(':treatmentpacketId')
  async destroy(@Param('treatmentpacketId') treatmentpacketId: number) {
    await this.treatmentPacketService.destroy(treatmentpacketId);
  }
}
