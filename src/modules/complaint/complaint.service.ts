import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FindOptions, Op } from 'sequelize';
import { COMPLAINT_REPOSITORY, PAGINATION_DEFAULT_LIMIT } from 'src/constants';
import { Complaint } from 'src/entities/complaint.entity';
import { IPagination, IPaginationResponse } from 'src/types/pagination.type';
import { PaginationUtility } from 'src/utils/pagination.util';
import { ICreateComplaint } from './types/create_complaint.type';
import { IUpdateComplaint } from './types/update_complaint.type';
import { Meridian } from 'src/entities/meridian.entity';

@Injectable()
export class ComplaintService {
  constructor(
    private paginationUtility: PaginationUtility,
    @Inject(COMPLAINT_REPOSITORY) private complaintRepository: typeof Complaint,
  ) {}

  async getAllWithPagination(
    pagination: IPagination,
    withMeridian: boolean,
  ): Promise<IPaginationResponse<Complaint>> {
    const offset = this.paginationUtility.calculateOffset(pagination);
    const limit = pagination.limit || PAGINATION_DEFAULT_LIMIT;

    const includeMeridian: FindOptions = {};

    if (withMeridian) {
      includeMeridian.include = Meridian;
    }

    const complaints = await this.complaintRepository.findAndCountAll({
      offset,
      limit,
      ...includeMeridian,
    });
    return this.paginationUtility.paginationResponse(
      pagination,
      complaints.rows,
      complaints.count,
    );
  }

  async findAllByName(
    name: string,
    withMeridian: boolean,
  ): Promise<Complaint[]> {
    const includeMeridian: FindOptions = {};

    if (withMeridian) {
      includeMeridian.include = Meridian;
    }

    return await this.complaintRepository.findAll({
      where: { name: { [Op.substring]: name } },
      ...includeMeridian,
    });
  }

  async create(createComplaintDTO: ICreateComplaint): Promise<Complaint> {
    return await this.complaintRepository.create(createComplaintDTO as any);
  }

  async update(
    complaintId: number,
    updateComplaintDTO: IUpdateComplaint,
  ): Promise<Complaint> {
    const complaint = await this.complaintRepository.findOne({
      where: { id: complaintId },
    });
    if (!complaint) {
      throw new NotFoundException(`Complaint with id ${complaintId} not found`);
    }
    complaint.set(updateComplaintDTO);
    await complaint.save();
    return complaint;
  }

  async destroy(complaintId: number): Promise<void> {
    const complaint = await this.complaintRepository.findOne({
      where: { id: complaintId },
    });
    if (!complaint) {
      throw new NotFoundException(`Complaint with id ${complaintId} not found`);
    }
    await complaint.destroy();
  }
}
