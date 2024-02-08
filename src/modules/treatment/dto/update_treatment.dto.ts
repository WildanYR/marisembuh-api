import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IPulseCheckup } from '../types/pulse_checkup.type';
import { ITherapyAction } from '../types/therapy_action.type';
import { Type } from 'class-transformer';
import { IUpdateTreatment } from '../types/update_treatment.type';

class PulseCheckupDTO implements IPulseCheckup {
  @IsOptional()
  @IsString()
  depth: string;

  @IsOptional()
  @IsString()
  speed: string;

  @IsOptional()
  @IsString()
  power: string;

  @IsOptional()
  @IsString()
  abnormal_type: string;

  @IsOptional()
  @IsString()
  location_differentiation: string;
}

class TherapyActionDTO implements ITherapyAction {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  detail: string;
}

export class UpdateTreatmentDTO implements IUpdateTreatment {
  @IsOptional()
  @IsString()
  objective: string;

  @IsOptional()
  @IsString()
  blood_pressure?: string;

  @IsOptional()
  @IsString()
  pulse_frequency?: string;

  @IsOptional()
  @IsBoolean()
  is_pregnant?: boolean;

  @IsOptional()
  @IsString()
  evaluation?: string;

  @IsOptional()
  @IsNumber()
  duration_advice_id?: number;

  @IsOptional()
  @IsNumber()
  patient_id: number;

  @IsOptional()
  @IsNumber()
  treatment_packet_id?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TherapyActionDTO)
  therapy: TherapyActionDTO[];

  @IsOptional()
  @IsNumber({}, { each: true })
  doctor_diagnosis?: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  medicine?: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  therapy_history?: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  complaint?: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  stomach_checkup?: number[];

  @IsOptional()
  @ValidateNested()
  @Type(() => PulseCheckupDTO)
  pulse_checkup?: PulseCheckupDTO;

  @IsOptional()
  @IsNumber({}, { each: true })
  tongue_checkup?: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  self_therapy?: number[];

  @IsOptional()
  @IsNumber()
  user_id?: number;

  @IsOptional()
  @IsNumber()
  clinic_id?: number;
}
