import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Op } from 'sequelize';
import { Medicine } from 'src/entities/medicine.entity';
import { IPagination, IPaginationResponse } from 'src/types/pagination.type';
import { PaginationUtility } from 'src/utils/pagination.util';
import { ICreateMedicine } from './types/create_medicine.type';
import { IUpdateMedicine } from './types/update_medicine.type';
import { PAGINATION_DEFAULT_LIMIT } from 'src/constants/database.const';
import { MEDICINE_REPOSITORY } from 'src/constants/repository.const';

@Injectable()
export class MedicineService {
  constructor(
    private paginationUtility: PaginationUtility,
    @Inject(MEDICINE_REPOSITORY) private medicineRepository: typeof Medicine,
  ) {}

  async getAllWithPagination(
    pagination: IPagination,
  ): Promise<IPaginationResponse<Medicine>> {
    const offset = this.paginationUtility.calculateOffset(pagination);
    const limit = pagination.limit || PAGINATION_DEFAULT_LIMIT;
    const medicines = await this.medicineRepository.findAndCountAll({
      offset,
      limit,
    });
    return this.paginationUtility.paginationResponse(
      pagination,
      medicines.rows,
      medicines.count,
    );
  }

  async findById(medicineId: number): Promise<Medicine> {
    return await this.medicineRepository.findOne({
      where: { id: medicineId },
    });
  }

  async findAllByName(name: string): Promise<Medicine[]> {
    return await this.medicineRepository.findAll({
      where: { name: { [Op.substring]: name } },
    });
  }

  async create(createMedicineDTO: ICreateMedicine): Promise<Medicine> {
    return await this.medicineRepository.create(createMedicineDTO as any);
  }

  async update(
    medicineId: number,
    updateMedicineDTO: IUpdateMedicine,
  ): Promise<Medicine> {
    const medicine = await this.medicineRepository.findOne({
      where: { id: medicineId },
    });
    if (!medicine) {
      throw new NotFoundException(`Medicine with id ${medicineId} not found`);
    }
    medicine.set(updateMedicineDTO);
    await medicine.save();
    return medicine;
  }

  async destroy(medicineId: number): Promise<void> {
    const medicine = await this.medicineRepository.findOne({
      where: { id: medicineId },
    });
    if (!medicine) {
      throw new NotFoundException(`Medicine with id ${medicineId} not found`);
    }
    await medicine.destroy();
  }
}
