import { IsOptional, IsString } from 'class-validator';
import { IUpdateTreatmentPacket } from '../types/update_treatment_packet.type';

export class UpdateTreatmentPacketDTO implements IUpdateTreatmentPacket {
  @IsOptional()
  @IsString()
  name?: string;
}
