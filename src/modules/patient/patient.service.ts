import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  PAGINATION_DEFAULT_LIMIT,
  PATIENT_REPOSITORY,
  RM_PREFIX,
} from 'src/constants';
import { Patient } from 'src/entities/patient.entity';
import { IPagination, IPaginationResponse } from 'src/types/pagination.type';
import { PaginationUtility } from 'src/utils/pagination.util';
import { ICreatePatient } from './types/create_patient.type';
import { IUpdatePatient } from './types/update_patient.type';
import { Op } from 'sequelize';
import { User } from 'src/entities/user.entity';
import { Clinic } from 'src/entities/clinic.entity';

@Injectable()
export class PatientService {
  constructor(
    private paginationUtility: PaginationUtility,
    @Inject(PATIENT_REPOSITORY) private patientRepository: typeof Patient,
  ) {}

  async getAllWithPagination(
    pagination: IPagination,
  ): Promise<IPaginationResponse<Patient>> {
    const offset = this.paginationUtility.calculateOffset(pagination);
    const limit = pagination.limit || PAGINATION_DEFAULT_LIMIT;
    const patients = await this.patientRepository.findAndCountAll({
      offset,
      limit,
      include: [
        {
          model: User,
          as: 'registered_by',
          attributes: ['id', 'name', 'role'],
        },
        { model: Clinic, as: 'register_clinic' },
      ],
    });
    return this.paginationUtility.paginationResponse(
      pagination,
      patients.rows,
      patients.count,
    );
  }

  async findById(patientId: number): Promise<Patient> {
    return await this.patientRepository.findOne({
      where: { id: patientId },
      include: [
        { model: User, as: 'registered_by' },
        { model: Clinic, as: 'register_clinic' },
      ],
    });
  }

  async getByNameOrRM(search: string): Promise<Patient[]> {
    const condition: any = {};
    const prefix = search.slice(0, 2);
    if (prefix === RM_PREFIX || prefix === RM_PREFIX.toLowerCase()) {
      const searchInt = parseInt(search.slice(2));
      if (searchInt) {
        condition.id = searchInt;
      } else {
        condition.name = { [Op.substring]: search };
      }
    } else {
      const searchInt = parseInt(search);
      if (searchInt) {
        condition.id = searchInt;
      } else {
        condition.name = { [Op.substring]: search };
      }
    }
    return await this.patientRepository.findAll({
      where: { ...condition },
      include: [
        { model: User, as: 'registered_by' },
        { model: Clinic, as: 'register_clinic' },
      ],
    });
  }

  async create(createPatientDTO: ICreatePatient): Promise<Patient> {
    const { birthdate, ...data } = createPatientDTO;
    if (birthdate) {
      (data as any).birthdate = birthdate;
    }
    return await this.patientRepository.create(data as any);
  }

  async update(
    patientId: number,
    updatePatientDTO: IUpdatePatient,
  ): Promise<Patient> {
    const patient = await this.patientRepository.findOne({
      where: { id: patientId },
    });
    if (!patient) {
      throw new NotFoundException(`patient with id ${patientId} not found`);
    }
    patient.set(updatePatientDTO);
    await patient.save();
    return patient;
  }

  async destroy(patientId: number): Promise<void> {
    const patient = await this.patientRepository.findOne({
      where: { id: patientId },
    });
    if (!patient) {
      throw new NotFoundException(`patient with id ${patientId} not found`);
    }
    await patient.destroy();
  }
}
