import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { Absence } from 'src/entities/absence.entity';
import { AbsenceStatus } from './enums/absence_status.enum';
import { IAbsenceResponse } from './types/absence_response.type';
import { AbsenceType } from './enums/absence_type.enum';
import { DateUtility } from 'src/utils/date.util';
import { ABSENCE_REPOSITORY } from 'src/constants/repository.const';
import { ABSENCE_QRCODE_TEXT } from 'src/constants/setting.const';

@Injectable()
export class AbsenceService {
  constructor(
    private dateUtility: DateUtility,
    @Inject(ABSENCE_REPOSITORY) private absenceRepository: typeof Absence,
  ) {}

  private generateAbsenceResponse(
    status: AbsenceStatus,
    absence_code?: string,
  ) {
    const response: IAbsenceResponse = {
      status,
    };
    if (status === AbsenceStatus.HAS_ABSENT) {
      response.absence_code = absence_code;
    }
    return response;
  }

  private generateAbsenceCode() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      let index = Math.floor(Math.random() * chars.length);
      result += chars[index];
    }
    return result;
  }

  async checkAbsence(user_id: number): Promise<IAbsenceResponse> {
    const { startOfDay, endOfDay } = this.dateUtility.getStartEndOfDay();
    const absence = await this.absenceRepository.findOne({
      where: {
        user_id,
        created_at: {
          [Op.between]: [startOfDay, endOfDay],
        },
      },
    });
    if (!absence) {
      return this.generateAbsenceResponse(AbsenceStatus.NO_ABSENCE);
    }
    if (absence.afterwork_time)
      return this.generateAbsenceResponse(AbsenceStatus.AFTERWORK);
    if (
      absence.type === AbsenceType.HOMECARE.toString() &&
      !absence.in_clinic_time
    ) {
      return this.generateAbsenceResponse(AbsenceStatus.HOMECARE);
    }
    return this.generateAbsenceResponse(
      AbsenceStatus.HAS_ABSENT,
      absence.absence_code,
    );
  }

  async handleAbsence(
    user_id: number,
    type: AbsenceType,
    data: string,
  ): Promise<IAbsenceResponse> {
    const absenceResponse = await this.checkAbsence(user_id);
    if (
      absenceResponse.status === AbsenceStatus.HAS_ABSENT ||
      absenceResponse.status === AbsenceStatus.AFTERWORK
    )
      return absenceResponse;

    const { startOfDay, endOfDay } = this.dateUtility.getStartEndOfDay();
    const absence_code = this.generateAbsenceCode();

    // handle finish homecare
    if (absenceResponse.status === AbsenceStatus.HOMECARE) {
      if (data !== ABSENCE_QRCODE_TEXT)
        throw new BadRequestException('Qrcode tidak sesuai');
      await this.absenceRepository.update(
        { in_clinic_time: this.dateUtility.getNow(), absence_code },
        {
          where: {
            user_id,
            created_at: { [Op.between]: [startOfDay, endOfDay] },
          },
        },
      );
      return this.generateAbsenceResponse(
        AbsenceStatus.HAS_ABSENT,
        absence_code,
      );
    }

    const newAbsence = new this.absenceRepository({ user_id });
    let absenceStatus: AbsenceStatus;
    // handle QrCode
    if (
      absenceResponse.status === AbsenceStatus.NO_ABSENCE &&
      type === AbsenceType.QRCODE
    ) {
      if (data !== ABSENCE_QRCODE_TEXT)
        throw new BadRequestException('Qrcode tidak sesuai');
      newAbsence.type = AbsenceType.QRCODE.toString();
      newAbsence.absence_code = absence_code;
      absenceStatus = AbsenceStatus.HAS_ABSENT;
    }
    // handle new Homecare
    if (
      absenceResponse.status === AbsenceStatus.NO_ABSENCE &&
      type === AbsenceType.HOMECARE
    ) {
      newAbsence.type = AbsenceType.HOMECARE.toString();
      absenceStatus = AbsenceStatus.HOMECARE;
    }
    // handle Code
    if (
      absenceResponse.status === AbsenceStatus.NO_ABSENCE &&
      type === AbsenceType.CODE
    ) {
      const absenceCodeFrom = await this.absenceRepository.findOne({
        where: {
          absence_code: data,
          created_at: { [Op.between]: [startOfDay, endOfDay] },
        },
      });
      if (!absenceCodeFrom)
        throw new BadRequestException('Kode Absen tidak ditemukan');
      newAbsence.type = AbsenceType.CODE.toString();
      newAbsence.absence_code = absence_code;
      newAbsence.code_from = absenceCodeFrom.user_id;
      absenceStatus = AbsenceStatus.HAS_ABSENT;
    }
    await newAbsence.save();
    return this.generateAbsenceResponse(absenceStatus, absence_code);
  }

  async finishWork(user_id: number) {
    const absenceResponse = await this.checkAbsence(user_id);
    if (absenceResponse.status !== AbsenceStatus.HAS_ABSENT)
      throw new BadRequestException('Absen hari ini tidak ditemukan');

    const { startOfDay, endOfDay } = this.dateUtility.getStartEndOfDay();

    await this.absenceRepository.update(
      { afterwork_time: this.dateUtility.getNow() },
      {
        where: {
          user_id,
          created_at: { [Op.between]: [startOfDay, endOfDay] },
        },
      },
    );
    return this.generateAbsenceResponse(AbsenceStatus.AFTERWORK);
  }
}
