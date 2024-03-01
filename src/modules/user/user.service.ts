import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PAGINATION_DEFAULT_LIMIT, USER_REPOSITORY } from 'src/constants';
import { User } from 'src/entities/user.entity';
import { IPagination, IPaginationResponse } from 'src/types/pagination.type';
import { PaginationUtility } from 'src/utils/pagination.util';
import { ICreateUser } from './types/create_user.type';
import { IUpdateUser } from './types/update_user.type';
import { HashUtility } from 'src/utils/hash.util';
import { Includeable, Op, UniqueConstraintError } from 'sequelize';
import { Clinic } from 'src/entities/clinic.entity';

@Injectable()
export class UserService {
  getInclude: Includeable[] = [
    {
      model: Clinic,
      as: 'clinic',
    },
  ];

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
    const users = await this.userRepository.findAndCountAll({
      offset,
      limit,
      include: this.getInclude,
    });
    const response = this.paginationUtility.paginationResponse(
      pagination,
      users.rows,
      users.count,
    );
    return response;
  }

  async findById(userId: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id: userId },
      include: this.getInclude,
    });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email },
      include: this.getInclude,
    });
  }

  async findByNameEmail(query: string): Promise<User[]> {
    return await this.userRepository.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.substring]: query } },
          { email: { [Op.substring]: query } },
        ],
      },
      include: this.getInclude,
    });
  }

  async create(createUserDTO: ICreateUser): Promise<User> {
    try {
      const hashedPassword = await this.hashUtility.hash(
        createUserDTO.password,
      );
      const newUser = await this.userRepository.create({
        ...createUserDTO,
        password: hashedPassword,
      });
      return await this.userRepository.findOne({
        where: { id: newUser.id },
        include: this.getInclude,
      });
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new UnprocessableEntityException('Email sudah terpakai');
      }
      throw error;
    }
  }

  async update(userId: number, updateUserDTO: IUpdateUser): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    if (updateUserDTO.password) {
      const hashedPassword = await this.hashUtility.hash(
        updateUserDTO.password,
      );
      updateUserDTO.password = hashedPassword;
    }
    user.set(updateUserDTO);
    await user.save();
    return await this.userRepository.findOne({
      where: { id: user.id },
      include: this.getInclude,
    });
  }

  async destroy(userId: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    await user.destroy();
  }
}
