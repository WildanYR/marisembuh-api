import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Op } from 'sequelize';
import { StomachCheckup } from 'src/entities/stomach_checkup.entity';
import { IPagination, IPaginationResponse } from 'src/types/pagination.type';
import { PaginationUtility } from 'src/utils/pagination.util';
import { ICreateStomachCheckup } from './types/create_stomach_checkup.type';
import { IUpdateStomachCheckup } from './types/update_stomach_checkup.type';
import { PAGINATION_DEFAULT_LIMIT } from 'src/constants/database.const';
import { STOMACH_CHECKUP_REPOSITORY } from 'src/constants/repository.const';

@Injectable()
export class StomachCheckupService {
  constructor(
    private paginationUtility: PaginationUtility,
    @Inject(STOMACH_CHECKUP_REPOSITORY)
    private stomachCheckupRepository: typeof StomachCheckup,
  ) {}

  async getAllWithPagination(
    pagination: IPagination,
  ): Promise<IPaginationResponse<StomachCheckup>> {
    const offset = this.paginationUtility.calculateOffset(pagination);
    const limit = pagination.limit || PAGINATION_DEFAULT_LIMIT;
    const stomachcheckups = await this.stomachCheckupRepository.findAndCountAll(
      {
        offset,
        limit,
      },
    );
    return this.paginationUtility.paginationResponse(
      pagination,
      stomachcheckups.rows,
      stomachcheckups.count,
    );
  }

  async findById(stomachcheckupId: number): Promise<StomachCheckup> {
    return await this.stomachCheckupRepository.findOne({
      where: { id: stomachcheckupId },
    });
  }

  async findAllByName(name: string): Promise<StomachCheckup[]> {
    return await this.stomachCheckupRepository.findAll({
      where: { name: { [Op.substring]: name } },
    });
  }

  async create(
    createStomachCheckupDTO: ICreateStomachCheckup,
  ): Promise<StomachCheckup> {
    return await this.stomachCheckupRepository.create(
      createStomachCheckupDTO as any,
    );
  }

  async update(
    stomachcheckupId: number,
    updateStomachCheckupDTO: IUpdateStomachCheckup,
  ): Promise<StomachCheckup> {
    const stomachcheckup = await this.stomachCheckupRepository.findOne({
      where: { id: stomachcheckupId },
    });
    if (!stomachcheckup) {
      throw new NotFoundException(
        `StomachCheckup with id ${stomachcheckupId} not found`,
      );
    }
    stomachcheckup.set(updateStomachCheckupDTO);
    await stomachcheckup.save();
    return stomachcheckup;
  }

  async destroy(stomachcheckupId: number): Promise<void> {
    const stomachcheckup = await this.stomachCheckupRepository.findOne({
      where: { id: stomachcheckupId },
    });
    if (!stomachcheckup) {
      throw new NotFoundException(
        `StomachCheckup with id ${stomachcheckupId} not found`,
      );
    }
    await stomachcheckup.destroy();
  }
}
