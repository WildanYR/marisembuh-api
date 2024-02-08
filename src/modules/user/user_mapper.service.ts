import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { IUserMap } from './types/user_map.type';

@Injectable()
export class UserMapperService {
  mapOne(user: User): IUserMap {
    let clinic = null;
    if (user.clinic) {
      clinic = {
        id: user.clinic.id,
        name: user.clinic.name,
      };
    }
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      clinic_id: user.clinic_id,
      clinic,
    };
  }

  mapMany(users: User[]): IUserMap[] {
    const userMaps: IUserMap[] = [];
    for (const user of users) {
      userMaps.push(this.mapOne(user));
    }
    return userMaps;
  }
}
