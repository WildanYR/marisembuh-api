import { ICreateTreatmentPacket } from './create_treatment_packet.type';

export interface IUpdateTreatmentPacket
  extends Partial<ICreateTreatmentPacket> {}
