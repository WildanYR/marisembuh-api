import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PAGINATION_DEFAULT_LIMIT, USER_REPOSITORY } from 'src/constants';
import { User } from 'src/entities/user.entity';
import { IPagination, IPaginationResponse } from 'src/types/pagination.type';
import { PaginationUtility } from 'src/utils/pagination.util';
import { ICreateUser } from './types/create_user.type';
import { IUpdateUser } from './types/update_user.type';
import { HashUtility } from 'src/utils/hash.util';

@Injectable()
export class UserService {
  constructor(
    private paginationUtility: PaginationUtility,
    private hashUtility: HashUtility,
    @Inject(USER_REPOSITORY) private userRepository: typeof User,
  ) {}

  async getAllWithPagination(
    pagination: IPagination,
  ): Promise<IPaginationResponse<User>> {
    const offset = this.paginationUtility.calculateOffset(pagination);
    const limit = pagination.limit || PAGINATION_DEFAULT_LIMIT;
    const users = await this.userRepository.findAndCountAll({ offset, limit });
    const response = this.paginationUtility.paginationResponse(
      pagination,
      users.rows,
      users.count,
    );
    return response;
  }

  async findById(userId: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id: userId } });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async create(createUserDTO: ICreateUser): Promise<User> {
    const hashedPassword = await this.hashUtility.hash(createUserDTO.password);
    const user = await this.userRepository.create({
      ...createUserDTO,
      password: hashedPassword,
    });
    return user;
  }

  async update(userId: number, updateUserDTO: IUpdateUser): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    user.set(updateUserDTO);
    await user.save();
    return user;
  }

  async destroy(userId: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    await user.destroy();
  }
}