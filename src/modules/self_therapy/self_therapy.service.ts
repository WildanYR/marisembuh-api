import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Op } from 'sequelize';
import {
  SELF_THERAPY_REPOSITORY,
  PAGINATION_DEFAULT_LIMIT,
} from 'src/constants';
import { SelfTherapy } from 'src/entities/self_therapy.entity';
import { IPagination, IPaginationResponse } from 'src/types/pagination.type';
import { PaginationUtility } from 'src/utils/pagination.util';
import { ICreateSelfTherapy } from './types/create_self_therapy.type';
import { IUpdateSelfTherapy } from './types/update_self_therapy.type';

@Injectable()
export class SelfTherapyService {
  constructor(
    private paginationUtility: PaginationUtility,
    @Inject(SELF_THERAPY_REPOSITORY)
    private selfTherapyRepository: typeof SelfTherapy,
  ) {}

  async getAllWithPagination(
    pagination: IPagination,
  ): Promise<IPaginationResponse<SelfTherapy>> {
    const offset = this.paginationUtility.calculateOffset(pagination);
    const limit = pagination.limit || PAGINATION_DEFAULT_LIMIT;
    const selftherapys = await this.selfTherapyRepository.findAndCountAll({
      offset,
      limit,
    });
    return this.paginationUtility.paginationResponse(
      pagination,
      selftherapys.rows,
      selftherapys.count,
    );
  }

  async findAllByName(name: string): Promise<SelfTherapy[]> {
    return await this.selfTherapyRepository.findAll({
      where: { name: { [Op.substring]: name } },
    });
  }

  async create(createSelfTherapyDTO: ICreateSelfTherapy): Promise<SelfTherapy> {
    return await this.selfTherapyRepository.create(createSelfTherapyDTO as any);
  }

  async update(
    selftherapyId: number,
    updateSelfTherapyDTO: IUpdateSelfTherapy,
  ): Promise<SelfTherapy> {
    const selftherapy = await this.selfTherapyRepository.findOne({
      where: { id: selftherapyId },
    });
    if (!selftherapy) {
      throw new NotFoundException(
        `SelfTherapy with id ${selftherapyId} not found`,
      );
    }
    selftherapy.set(updateSelfTherapyDTO);
    await selftherapy.save();
    return selftherapy;
  }

  async destroy(selftherapyId: number): Promise<void> {
    const selftherapy = await this.selfTherapyRepository.findOne({
      where: { id: selftherapyId },
    });
    if (!selftherapy) {
      throw new NotFoundException(
        `SelfTherapy with id ${selftherapyId} not found`,
      );
    }
    await selftherapy.destroy();
  }
}
