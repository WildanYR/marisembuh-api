import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PATIENT_ARRIVAL_REPOSITORY } from 'src/constants/repository.const';
import { PatientArrival } from 'src/entities/patient_arrival.entity';
import { ICreatePatientArrival } from './types/create_patient_arrival.type';
import { IPagination, IPaginationResponse } from 'src/types/pagination.type';
import { PaginationUtility } from 'src/utils/pagination.util';
import { PAGINATION_DEFAULT_LIMIT } from 'src/constants/database.const';
import { Patient } from 'src/entities/patient.entity';
import { User } from 'src/entities/user.entity';
import { IUpdatePatientArrival } from './types/update_patient_arrival.type';
import { Includeable } from 'sequelize';
import { IGetPatientArrivalQuery } from './types/get_patient_arrival_query.type';
import { Clinic } from 'src/entities/clinic.entity';

@Injectable()
export class PatientArrivalService {
  queryIncludes: Includeable[] = [
    {
      model: Patient,
      as: 'patient',
      attributes: [
        'id',
        'no_rm',
        'name',
        'gender',
        'birthdate',
        'address',
        'telp',
      ],
      include: [
        { model: Clinic, as: 'register_clinic', attributes: ['id', 'name'] },
      ],
    },
    { model: User, as: 'user', attributes: ['id', 'name'] },
    { model: User, as: 'tag_user', attributes: ['id', 'name'] },
  ];
  constructor(
    private paginationUtility: PaginationUtility,
    @Inject(PATIENT_ARRIVAL_REPOSITORY)
    private patientArrivalRepository: typeof PatientArrival,
  ) {}

  async getAllWithPagination(
    pagination: IPagination,
    getFilter?: IGetPatientArrivalQuery,
  ): Promise<IPaginationResponse<PatientArrival>> {
    const offset = this.paginationUtility.calculateOffset(pagination);
    const limit = pagination.limit || PAGINATION_DEFAULT_LIMIT;

    const condition: any = {};
    if (typeof getFilter?.done === 'boolean') {
      condition.done = getFilter.done;
    }
    if (getFilter?.patient_id) {
      condition.patient_id = getFilter.patient_id;
    }
    if (getFilter?.user_id) {
      condition.user_id = getFilter.user_id;
    }
    if (getFilter?.tag_user_id) {
      condition.tag_user_id = getFilter.tag_user_id;
    }
    if (getFilter?.type) {
      condition.type = getFilter.type;
    }

    const patientArrivals = await this.patientArrivalRepository.findAndCountAll(
      {
        order: [['id', 'desc']],
        include: this.queryIncludes,
        where: condition,
        offset,
        limit,
      },
    );

    return this.paginationUtility.paginationResponse(
      pagination,
      patientArrivals.rows,
      patientArrivals.count,
    );
  }

  async getById(patientArrivalId: number) {
    return await this.patientArrivalRepository.findOne({
      where: { id: patientArrivalId },
      include: this.queryIncludes,
    });
  }

  async create(createPatientTreatmentData: ICreatePatientArrival) {
    return await this.patientArrivalRepository.create(
      createPatientTreatmentData as any,
    );
  }

  async update(
    patientArrivalId: number,
    updatePatientTreatmentData: IUpdatePatientArrival,
  ) {
    const patientArrival = await this.patientArrivalRepository.findOne({
      where: { id: patientArrivalId },
    });
    if (!patientArrival) {
      throw new NotFoundException(
        `Patient treatment with id ${patientArrivalId} not found`,
      );
    }
    patientArrival.set(updatePatientTreatmentData);
    await patientArrival.save();
    return patientArrival;
  }

  async destroy(patientArrivalId: number) {
    await this.patientArrivalRepository.destroy({
      where: { id: patientArrivalId },
    });
  }
}
