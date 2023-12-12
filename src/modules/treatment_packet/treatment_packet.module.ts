import { Module } from '@nestjs/common';
import { TREATMENT_PACKET_REPOSITORY } from 'src/constants';
import { TreatmentPacket } from 'src/entities/treatment_packet.entity';
import { PaginationUtility } from 'src/utils/pagination.util';
import { TreatmentPacketController } from './treatment_packet.controller';
import { TreatmentPacketService } from './treatment_packet.service';

@Module({
  providers: [
    PaginationUtility,
    { provide: TREATMENT_PACKET_REPOSITORY, useValue: TreatmentPacket },
    TreatmentPacketService,
  ],
  controllers: [TreatmentPacketController],
})
export class TreatmentPacketModule {}
