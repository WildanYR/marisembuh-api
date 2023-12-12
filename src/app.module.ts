import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { DatabaseModule } from './database/database.module';
import databaseConfig from './config/database.config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import keyConfig from './config/key.config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { ClinicModule } from './modules/clinic/clinic.module';
import { MedicineModule } from './modules/medicine/medicine.module';
import { DoctorDiagnosisModule } from './modules/doctor_diagnosis/doctor_diagnosis.module';
import { SelfTherapyModule } from './modules/self_therapy/self_therapy.module';
import { TreatmentPacketModule } from './modules/treatment_packet/treatment_packet.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [appConfig, databaseConfig, keyConfig],
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    ClinicModule,
    MedicineModule,
    DoctorDiagnosisModule,
    SelfTherapyModule,
    TreatmentPacketModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
