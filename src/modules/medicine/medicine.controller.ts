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
import { MedicineService } from './medicine.service';
import { PaginationDTO } from 'src/dto/pagination.dto';
import { CreateMedicineDTO } from './dto/create_medicine.dto';
import { UpdateMedicineDTO } from './dto/update_medicine.dto';

@Controller('medicine')
export class MedicineController {
  constructor(private medicineService: MedicineService) {}

  @Get()
  async getAllWithPagination(
    @Query() paginationDTO: PaginationDTO,
    @Query('name') name: string,
  ) {
    if (name) {
      return await this.medicineService.findAllByName(name);
    }
    return await this.medicineService.getAllWithPagination({
      ...paginationDTO,
    });
  }

  @Get(':medicineId')
  async findById(@Param('medicineId') medicineId: number) {
    return await this.medicineService.findById(medicineId);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createMedicineDTO: CreateMedicineDTO) {
    return await this.medicineService.create({ ...createMedicineDTO });
  }

  @Put(':medicineId')
  async update(
    @Param('medicineId') medicineId: number,
    @Body() updateMedicineDTO: UpdateMedicineDTO,
  ) {
    return await this.medicineService.update(medicineId, {
      ...updateMedicineDTO,
    });
  }

  @Delete(':medicineId')
  async destroy(@Param('medicineId') medicineId: number) {
    await this.medicineService.destroy(medicineId);
  }
}
