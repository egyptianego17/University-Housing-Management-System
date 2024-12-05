import { Controller, UseGuards, Post, Get } from '@nestjs/common';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../auth/decorators/role.decorator';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(AuthGuard(), RolesGuard)
  @Role('STUDENT')
  GetAsaadsDildo(@GetUser() user: User): string {
    return "Asaad's Dildo";
  }

  @Get('getRole')
  @UseGuards(AuthGuard(), RolesGuard)
  GetRole(@GetUser() user: User): string {
    return user.role;
  }
}
