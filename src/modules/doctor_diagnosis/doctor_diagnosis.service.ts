import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Op } from 'sequelize';
import { DoctorDiagnosis } from 'src/entities/doctor_diagnosis.entity';
import { IPagination, IPaginationResponse } from 'src/types/pagination.type';
import { PaginationUtility } from 'src/utils/pagination.util';
import { ICreateDoctorDiagnosis } from './types/create_doctor_diagnosis.type';
import { IUpdateDoctorDiagnosis } from './types/update_doctor_diagnosis.type';
import { PAGINATION_DEFAULT_LIMIT } from 'src/constants/database.const';
import { DOCTOR_DIAGNOSIS_REPOSITORY } from 'src/constants/repository.const';

@Injectable()
export class DoctorDiagnosisService {
  constructor(
    private paginationUtility: PaginationUtility,
    @Inject(DOCTOR_DIAGNOSIS_REPOSITORY)
    private doctorDiagnosisRepository: typeof DoctorDiagnosis,
  ) {}

  async getAllWithPagination(
    pagination: IPagination,
  ): Promise<IPaginationResponse<DoctorDiagnosis>> {
    const offset = this.paginationUtility.calculateOffset(pagination);
    const limit = pagination.limit || PAGINATION_DEFAULT_LIMIT;
    const doctordiagnosiss =
      await this.doctorDiagnosisRepository.findAndCountAll({
        order: [['id', 'desc']],
        offset,
        limit,
      });
    return this.paginationUtility.paginationResponse(
      pagination,
      doctordiagnosiss.rows,
      doctordiagnosiss.count,
    );
  }

  async findById(doctordiagnosisId: number): Promise<DoctorDiagnosis> {
    return await this.doctorDiagnosisRepository.findOne({
      where: { id: doctordiagnosisId },
    });
  }

  async findAllByName(name: string): Promise<DoctorDiagnosis[]> {
    return await this.doctorDiagnosisRepository.findAll({
      order: [['id', 'desc']],
      where: { name: { [Op.substring]: name } },
    });
  }

  async create(
    createDoctorDiagnosisDTO: ICreateDoctorDiagnosis,
  ): Promise<DoctorDiagnosis> {
    return await this.doctorDiagnosisRepository.create(
      createDoctorDiagnosisDTO as any,
    );
  }

  async update(
    doctordiagnosisId: number,
    updateDoctorDiagnosisDTO: IUpdateDoctorDiagnosis,
  ): Promise<DoctorDiagnosis> {
    const doctordiagnosis = await this.doctorDiagnosisRepository.findOne({
      where: { id: doctordiagnosisId },
    });
    if (!doctordiagnosis) {
      throw new NotFoundException(
        `DoctorDiagnosis with id ${doctordiagnosisId} not found`,
      );
    }
    doctordiagnosis.set(updateDoctorDiagnosisDTO);
    await doctordiagnosis.save();
    return doctordiagnosis;
  }

  async destroy(doctordiagnosisId: number): Promise<void> {
    const doctordiagnosis = await this.doctorDiagnosisRepository.findOne({
      where: { id: doctordiagnosisId },
    });
    if (!doctordiagnosis) {
      throw new NotFoundException(
        `DoctorDiagnosis with id ${doctordiagnosisId} not found`,
      );
    }
    await doctordiagnosis.destroy();
  }
}
