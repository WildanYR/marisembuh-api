import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Op } from 'sequelize';
import { DurationAdvice } from 'src/entities/duration_advice.entity';
import { IPagination, IPaginationResponse } from 'src/types/pagination.type';
import { PaginationUtility } from 'src/utils/pagination.util';
import { ICreateDurationAdvice } from './types/create_duration_advice.type';
import { IUpdateDurationAdvice } from './types/update_duration_advice.type';
import { PAGINATION_DEFAULT_LIMIT } from 'src/constants/database.const';
import { DURATION_ADVICE_REPOSITORY } from 'src/constants/repository.const';

@Injectable()
export class DurationAdviceService {
  constructor(
    private paginationUtility: PaginationUtility,
    @Inject(DURATION_ADVICE_REPOSITORY)
    private durationAdviceRepository: typeof DurationAdvice,
  ) {}

  async getAllWithPagination(
    pagination: IPagination,
  ): Promise<IPaginationResponse<DurationAdvice>> {
    const offset = this.paginationUtility.calculateOffset(pagination);
    const limit = pagination.limit || PAGINATION_DEFAULT_LIMIT;
    const durationadvices = await this.durationAdviceRepository.findAndCountAll(
      {
        order: [['id', 'desc']],
        offset,
        limit,
      },
    );
    return this.paginationUtility.paginationResponse(
      pagination,
      durationadvices.rows,
      durationadvices.count,
    );
  }

  async findById(durationadviceId: number): Promise<DurationAdvice> {
    return await this.durationAdviceRepository.findOne({
      where: { id: durationadviceId },
    });
  }

  async findAllByName(name: string): Promise<DurationAdvice[]> {
    return await this.durationAdviceRepository.findAll({
      order: [['id', 'desc']],
      where: { name: { [Op.substring]: name } },
    });
  }

  async create(
    createDurationAdviceDTO: ICreateDurationAdvice,
  ): Promise<DurationAdvice> {
    return await this.durationAdviceRepository.create(
      createDurationAdviceDTO as any,
    );
  }

  async update(
    durationadviceId: number,
    updateDurationAdviceDTO: IUpdateDurationAdvice,
  ): Promise<DurationAdvice> {
    const durationadvice = await this.durationAdviceRepository.findOne({
      where: { id: durationadviceId },
    });
    if (!durationadvice) {
      throw new NotFoundException(
        `DurationAdvice with id ${durationadviceId} not found`,
      );
    }
    durationadvice.set(updateDurationAdviceDTO);
    await durationadvice.save();
    return durationadvice;
  }

  async destroy(durationadviceId: number): Promise<void> {
    const durationadvice = await this.durationAdviceRepository.findOne({
      where: { id: durationadviceId },
    });
    if (!durationadvice) {
      throw new NotFoundException(
        `DurationAdvice with id ${durationadviceId} not found`,
      );
    }
    await durationadvice.destroy();
  }
}
