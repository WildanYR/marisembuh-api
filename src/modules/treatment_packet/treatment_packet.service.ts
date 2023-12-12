import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Op } from 'sequelize';
import {
  TREATMENT_PACKET_REPOSITORY,
  PAGINATION_DEFAULT_LIMIT,
} from 'src/constants';
import { TreatmentPacket } from 'src/entities/treatment_packet.entity';
import { IPagination, IPaginationResponse } from 'src/types/pagination.type';
import { PaginationUtility } from 'src/utils/pagination.util';
import { ICreateTreatmentPacket } from './types/create_treatment_packet.type';
import { IUpdateTreatmentPacket } from './types/update_treatment_packet.type';

@Injectable()
export class TreatmentPacketService {
  constructor(
    private paginationUtility: PaginationUtility,
    @Inject(TREATMENT_PACKET_REPOSITORY)
    private treatmentPacketRepository: typeof TreatmentPacket,
  ) {}

  async getAllWithPagination(
    pagination: IPagination,
  ): Promise<IPaginationResponse<TreatmentPacket>> {
    const offset = this.paginationUtility.calculateOffset(pagination);
    const limit = pagination.limit || PAGINATION_DEFAULT_LIMIT;
    const treatmentpackets =
      await this.treatmentPacketRepository.findAndCountAll({
        offset,
        limit,
      });
    return this.paginationUtility.paginationResponse(
      pagination,
      treatmentpackets.rows,
      treatmentpackets.count,
    );
  }

  async findAllByName(name: string): Promise<TreatmentPacket[]> {
    return await this.treatmentPacketRepository.findAll({
      where: { name: { [Op.substring]: name } },
    });
  }

  async create(
    createTreatmentPacketDTO: ICreateTreatmentPacket,
  ): Promise<TreatmentPacket> {
    return await this.treatmentPacketRepository.create(
      createTreatmentPacketDTO as any,
    );
  }

  async update(
    treatmentpacketId: number,
    updateTreatmentPacketDTO: IUpdateTreatmentPacket,
  ): Promise<TreatmentPacket> {
    const treatmentpacket = await this.treatmentPacketRepository.findOne({
      where: { id: treatmentpacketId },
    });
    if (!treatmentpacket) {
      throw new NotFoundException(
        `TreatmentPacket with id ${treatmentpacketId} not found`,
      );
    }
    treatmentpacket.set(updateTreatmentPacketDTO);
    await treatmentpacket.save();
    return treatmentpacket;
  }

  async destroy(treatmentpacketId: number): Promise<void> {
    const treatmentpacket = await this.treatmentPacketRepository.findOne({
      where: { id: treatmentpacketId },
    });
    if (!treatmentpacket) {
      throw new NotFoundException(
        `TreatmentPacket with id ${treatmentpacketId} not found`,
      );
    }
    await treatmentpacket.destroy();
  }
}
