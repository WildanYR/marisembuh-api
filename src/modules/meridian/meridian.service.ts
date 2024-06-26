import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FindOptions, Op } from 'sequelize';
import { Meridian } from 'src/entities/meridian.entity';
import { IPagination, IPaginationResponse } from 'src/types/pagination.type';
import { PaginationUtility } from 'src/utils/pagination.util';
import { ICreateMeridian } from './types/create_meridian.type';
import { IUpdateMeridian } from './types/update_meridian.type';
import { Complaint } from 'src/entities/complaint.entity';
import { PAGINATION_DEFAULT_LIMIT } from 'src/constants/database.const';
import { MERIDIAN_REPOSITORY } from 'src/constants/repository.const';

@Injectable()
export class MeridianService {
  constructor(
    private paginationUtility: PaginationUtility,
    @Inject(MERIDIAN_REPOSITORY) private meridianRepository: typeof Meridian,
  ) {}

  async getAllWithPagination(
    pagination: IPagination,
    withComplaint: boolean,
  ): Promise<IPaginationResponse<Meridian>> {
    const offset = this.paginationUtility.calculateOffset(pagination);
    const limit = pagination.limit || PAGINATION_DEFAULT_LIMIT;
    const includeComplaint: FindOptions = {};

    if (withComplaint) {
      includeComplaint.include = Complaint;
    }

    const meridians = await this.meridianRepository.findAndCountAll({
      order: [['id', 'desc']],
      offset,
      limit,
      ...includeComplaint,
    });
    return this.paginationUtility.paginationResponse(
      pagination,
      meridians.rows,
      meridians.count,
    );
  }

  async findAllByName(
    name: string,
    withComplaint: boolean,
  ): Promise<Meridian[]> {
    const includeComplaint: FindOptions = {};

    if (withComplaint) {
      includeComplaint.include = Complaint;
    }

    return await this.meridianRepository.findAll({
      order: [['id', 'desc']],
      where: { name: { [Op.substring]: name } },
      ...includeComplaint,
    });
  }

  async findById(
    meridianId: number,
    withComplaint: boolean,
  ): Promise<Meridian> {
    const includeComplaint: FindOptions = {};

    if (withComplaint) {
      includeComplaint.include = Complaint;
    }

    return await this.meridianRepository.findOne({
      where: { id: meridianId },
      ...includeComplaint,
    });
  }

  async create(createMeridianDTO: ICreateMeridian): Promise<Meridian> {
    return await this.meridianRepository.create(createMeridianDTO as any);
  }

  async update(
    meridianId: number,
    updateMeridianDTO: IUpdateMeridian,
  ): Promise<Meridian> {
    const meridian = await this.meridianRepository.findOne({
      where: { id: meridianId },
    });
    if (!meridian) {
      throw new NotFoundException(`Meridian with id ${meridianId} not found`);
    }
    meridian.set(updateMeridianDTO);
    await meridian.save();
    return meridian;
  }

  async destroy(meridianId: number): Promise<void> {
    const meridian = await this.meridianRepository.findOne({
      where: { id: meridianId },
    });
    if (!meridian) {
      throw new NotFoundException(`Meridian with id ${meridianId} not found`);
    }
    await meridian.destroy();
  }
}
