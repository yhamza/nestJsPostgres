import { Controller, Get, Post , Put ,Delete , Param , Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/CreateUserDto.dto';
import { UpdateUserDto } from './dtos/UpdateUserDto.dto';
import { User } from 'src/typeorm/entities/Users';
import { PipesConsumer } from '@nestjs/core/pipes';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


@Get()
async findAll(): Promise<User[]> {
  return this.usersService.findAll();
}

@Get('user')
async findUser(@Body() data : any): Promise<any> {
  
  return this.usersService.findUser(data);
  }

@Post()
@UsePipes(new ValidationPipe())
async createUser(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<User> {
  return this.usersService.createUser(createUserDto);
  }

@Delete(':id')
async deleteUser(@Param('id') id: string): Promise<void> {
  return this.usersService.deleteUser(parseInt(id));
  }
@Put(':id')
@UsePipes(new ValidationPipe())
async updateUser(@Param('id') id: string, @Body(ValidationPipe) updateUserDto: UpdateUserDto): Promise<User> {  
  return this.usersService.updateUser(parseInt(id), updateUserDto);
}









}
