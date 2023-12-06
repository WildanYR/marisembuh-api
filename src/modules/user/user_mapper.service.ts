import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { IUserMap } from './types/user_map.type';

@Injectable()
export class UserMapperService {
  mapOne(user: User): IUserMap {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }

  mapMany(users: User[]): IUserMap[] {
    return users.map((user) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    }));
  }
}
