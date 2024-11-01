import {
  Controller,
  Get,
  ValidationPipe,
  UseGuards,
  Req,
  Post
} from '@nestjs/common';
import { GetUser } from '../auth/get-user.decorator';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(AuthGuard())
  GetAsaadsDildo(@GetUser() user: User): string {
    console.log(user);
    return "Asaad's Dildo";
  }
}