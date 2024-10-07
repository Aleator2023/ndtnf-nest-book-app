import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidationPipe } from './pipes/validation.pipe';

@Controller('users')
export class UsersController {
  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    return 'User created';
  }
}