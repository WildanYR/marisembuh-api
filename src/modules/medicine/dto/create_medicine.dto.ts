import { IsNotEmpty, IsString } from 'class-validator';
import { ICreateMedicine } from '../types/create_medicine.type';

export class CreateMedicineDTO implements ICreateMedicine {
  @IsNotEmpty()
  @IsString()
  name: string;
}
