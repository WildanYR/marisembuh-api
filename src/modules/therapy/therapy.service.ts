import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Op } from 'sequelize';
import { Therapy } from 'src/entities/therapy.entity';
import { IPagination, IPaginationResponse } from 'src/types/pagination.type';
import { PaginationUtility } from 'src/utils/pagination.util';
import { ICreateTherapy } from './types/create_therapy.type';
import { IUpdateTherapy } from './types/update_therapy.type';
import { PAGINATION_DEFAULT_LIMIT } from 'src/constants/database.const';
import { THERAPY_REPOSITORY } from 'src/constants/repository.const';

@Injectable()
export class TherapyService {
  constructor(
    private paginationUtility: PaginationUtility,
    @Inject(THERAPY_REPOSITORY) private therapyRepository: typeof Therapy,
  ) {}

  async getAllWithPagination(
    pagination: IPagination,
  ): Promise<IPaginationResponse<Therapy>> {
    const offset = this.paginationUtility.calculateOffset(pagination);
    const limit = pagination.limit || PAGINATION_DEFAULT_LIMIT;
    const therapys = await this.therapyRepository.findAndCountAll({
      order: [['id', 'desc']],
      offset,
      limit,
    });
    return this.paginationUtility.paginationResponse(
      pagination,
      therapys.rows,
      therapys.count,
    );
  }

  async findById(therapyId: number): Promise<Therapy> {
    return await this.therapyRepository.findOne({
      where: { id: therapyId },
    });
  }

  async findAllByName(name: string): Promise<Therapy[]> {
    return await this.therapyRepository.findAll({
      order: [['id', 'desc']],
      where: { name: { [Op.substring]: name } },
    });
  }

  async create(createTherapyDTO: ICreateTherapy): Promise<Therapy> {
    return await this.therapyRepository.create(createTherapyDTO as any);
  }

  async update(
    therapyId: number,
    updateTherapyDTO: IUpdateTherapy,
  ): Promise<Therapy> {
    const therapy = await this.therapyRepository.findOne({
      where: { id: therapyId },
    });
    if (!therapy) {
      throw new NotFoundException(`Therapy with id ${therapyId} not found`);
    }
    therapy.set(updateTherapyDTO);
    await therapy.save();
    return therapy;
  }

  async destroy(therapyId: number): Promise<void> {
    const therapy = await this.therapyRepository.findOne({
      where: { id: therapyId },
    });
    if (!therapy) {
      throw new NotFoundException(`Therapy with id ${therapyId} not found`);
    }
    await therapy.destroy();
  }
}
