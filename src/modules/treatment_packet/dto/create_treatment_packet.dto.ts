import { IsNotEmpty, IsString } from 'class-validator';
import { ICreateTreatmentPacket } from '../types/create_treatment_packet.type';

export class CreateTreatmentPacketDTO implements ICreateTreatmentPacket {
  @IsNotEmpty()
  @IsString()
  name: string;
}
