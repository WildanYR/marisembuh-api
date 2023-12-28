import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Op } from 'sequelize';
import {
  TONGUE_CHECKUP_REPOSITORY,
  PAGINATION_DEFAULT_LIMIT,
} from 'src/constants';
import { TongueCheckup } from 'src/entities/tongue_checkup.entity';
import { IPagination, IPaginationResponse } from 'src/types/pagination.type';
import { PaginationUtility } from 'src/utils/pagination.util';
import { ICreateTongueCheckup } from './types/create_tongue_checkup.type';
import { IUpdateTongueCheckup } from './types/update_tongue_checkup.type';

@Injectable()
export class TongueCheckupService {
  constructor(
    private paginationUtility: PaginationUtility,
    @Inject(TONGUE_CHECKUP_REPOSITORY)
    private tongueCheckupRepository: typeof TongueCheckup,
  ) {}

  async getAllWithPagination(
    pagination: IPagination,
  ): Promise<IPaginationResponse<TongueCheckup>> {
    const offset = this.paginationUtility.calculateOffset(pagination);
    const limit = pagination.limit || PAGINATION_DEFAULT_LIMIT;
    const tonguecheckups = await this.tongueCheckupRepository.findAndCountAll({
      offset,
      limit,
    });
    return this.paginationUtility.paginationResponse(
      pagination,
      tonguecheckups.rows,
      tonguecheckups.count,
    );
  }

  async findById(tongueCheckupId: number): Promise<TongueCheckup> {
    return await this.tongueCheckupRepository.findOne({
      where: { id: tongueCheckupId },
    });
  }

  async findAllByName(name: string): Promise<TongueCheckup[]> {
    return await this.tongueCheckupRepository.findAll({
      where: { name: { [Op.substring]: name } },
    });
  }

  async create(
    createTongueCheckupDTO: ICreateTongueCheckup,
  ): Promise<TongueCheckup> {
    return await this.tongueCheckupRepository.create(
      createTongueCheckupDTO as any,
    );
  }

  async update(
    tonguecheckupId: number,
    updateTongueCheckupDTO: IUpdateTongueCheckup,
  ): Promise<TongueCheckup> {
    const tonguecheckup = await this.tongueCheckupRepository.findOne({
      where: { id: tonguecheckupId },
    });
    if (!tonguecheckup) {
      throw new NotFoundException(
        `TongueCheckup with id ${tonguecheckupId} not found`,
      );
    }
    tonguecheckup.set(updateTongueCheckupDTO);
    await tonguecheckup.save();
    return tonguecheckup;
  }

  async destroy(tonguecheckupId: number): Promise<void> {
    const tonguecheckup = await this.tongueCheckupRepository.findOne({
      where: { id: tonguecheckupId },
    });
    if (!tonguecheckup) {
      throw new NotFoundException(
        `TongueCheckup with id ${tonguecheckupId} not found`,
      );
    }
    await tonguecheckup.destroy();
  }
}
