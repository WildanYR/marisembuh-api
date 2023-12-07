import { IsOptional, IsString } from 'class-validator';
import { IUpdateMedicine } from '../types/update_medicine.type';

export class UpdateMedicineDTO implements IUpdateMedicine {
  @IsOptional()
  @IsString()
  name?: string;
}
