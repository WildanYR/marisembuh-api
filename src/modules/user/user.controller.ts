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

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllWithPagination(@Query() paginationDTO: PaginationDTO) {
    return await this.userService.getAllWithPagination({ ...paginationDTO });
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createUserDTO: CreateUserDTO) {
    return await this.userService.create({ ...createUserDTO });
  }

  @Put(':userId')
  async update(
    @Param('userId') userId: number,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    return await this.userService.update(userId, { ...updateUserDTO });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':userId')
  async destroy(@Param('userId') userId: number) {
    return await this.userService.destroy(userId);
  }
}
