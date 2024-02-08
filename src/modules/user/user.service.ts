import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  MYSQL_PROVIDER,
  PAGINATION_DEFAULT_LIMIT,
  USER_REPOSITORY,
} from 'src/constants';
import { User } from 'src/entities/user.entity';
import { IPagination, IPaginationResponse } from 'src/types/pagination.type';
import { PaginationUtility } from 'src/utils/pagination.util';
import { ICreateUser } from './types/create_user.type';
import { IUpdateUser } from './types/update_user.type';
import { HashUtility } from 'src/utils/hash.util';
import { Includeable, Op, QueryTypes, UniqueConstraintError } from 'sequelize';
import { Clinic } from 'src/entities/clinic.entity';
import { DateUtility } from 'src/utils/date.util';
import { MysqlProvider } from 'src/database/mysql.provider';

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
    private dateUtility: DateUtility,
    @Inject(MYSQL_PROVIDER) private mysqlProvider: MysqlProvider,
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

  async getStatistics(date?: string) {
    const sql =
      'SELECT id, name, COALESCE(today_patient, 0) as today_patient, COALESCE(month_patient, 0) as month_patient FROM user AS c LEFT JOIN (SELECT user_id AS t_id, COUNT(user_id) AS today_patient FROM treatment AS j WHERE j.created_at BETWEEN ? AND ? GROUP BY user_id) AS t ON t.t_id = c.id LEFT JOIN (SELECT user_id AS m_id, COUNT(user_id) AS month_patient FROM treatment AS j WHERE j.created_at BETWEEN ? AND ? GROUP BY user_id) AS m ON m.m_id = c.id';
    const todayDate = date ? new Date(date) : new Date();
    const nowDateStr = this.dateUtility.formatLocaleString(todayDate);
    todayDate.setHours(0, 0, 0, 0);
    const todayDateStr = this.dateUtility.formatLocaleString(todayDate);
    todayDate.setDate(1);
    const monthDateStr = this.dateUtility.formatLocaleString(todayDate);
    const response = await this.mysqlProvider.rawQuery(sql, {
      type: QueryTypes.SELECT,
      replacements: [todayDateStr, nowDateStr, monthDateStr, nowDateStr],
    });
    return response;
  }
}
