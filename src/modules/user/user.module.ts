import { Module } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/constants';
import { User } from 'src/entities/user.entity';
import { PaginationUtility } from 'src/utils/pagination.util';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HashUtility } from 'src/utils/hash.util';
import { UserMapperService } from './user_mapper.service';

@Module({
  providers: [
    PaginationUtility,
    HashUtility,
    { provide: USER_REPOSITORY, useValue: User },
    UserService,
    UserMapperService,
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
