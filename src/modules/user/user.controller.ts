import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { PaginationDTO } from 'src/dto/pagination.dto';
import { CreateUserDTO } from './dto/create_user.dto';
import { UpdateUserDTO } from './dto/update_user.dto';
import { UserMapperService } from './user_mapper.service';

@Controller('/user')
export class UserController {
  constructor(
    private userService: UserService,
    private userMapperService: UserMapperService,
  ) {}

  @Get()
  async getAllWithPagination(@Query() paginationDTO: PaginationDTO) {
    const { items, ...userPgData } =
      await this.userService.getAllWithPagination({
        ...paginationDTO,
      });
    const userMap = this.userMapperService.mapMany(items);
    return { items: userMap, ...userPgData };
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createUserDTO: CreateUserDTO) {
    const user = await this.userService.create({ ...createUserDTO });
    return this.userMapperService.mapOne(user);
  }

  @Put(':userId')
  async update(
    @Param('userId') userId: number,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    const user = await this.userService.update(userId, { ...updateUserDTO });
    return this.userMapperService.mapOne(user);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':userId')
  async destroy(@Param('userId') userId: number) {
    return await this.userService.destroy(userId);
  }
}
