import { Module } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/constants';
import { User } from 'src/entities/user.entity';
import { PaginationUtility } from 'src/utils/pagination.util';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  providers: [
    PaginationUtility,
    { provide: USER_REPOSITORY, useValue: User },
    UserService,
  ],
  controllers: [UserController],
})
export class UserModule {}
