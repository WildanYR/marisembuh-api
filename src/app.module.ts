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
import { TherapyModule } from './modules/therapy/therapy.module';
import { MeridianModule } from './modules/meridian/meridian.module';
import { ComplaintModule } from './modules/complaint/complaint.module';
import { StomachCheckupModule } from './modules/stomach_checkup/stomach_checkup.module';
import { TongueCheckupModule } from './modules/tongue_checkup/tongue_checkup.module';
import { PatientModule } from './modules/patient/patient.module';
import { DurationAdviceModule } from './modules/duration_advice/duration_advice.module';
import { TreatmentModule } from './modules/treatment/treatment.module';

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
    TherapyModule,
    MeridianModule,
    ComplaintModule,
    StomachCheckupModule,
    TongueCheckupModule,
    PatientModule,
    DurationAdviceModule,
    TreatmentModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
