  import { Module } from '@nestjs/common';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { UserService } from './user.service';
  import { UserController } from './user.controller';
  import { UserRepository } from './user.repository'; 
  import { JwtStrategy } from './../auth/jwt.strategy';
  @Module({
    imports: [
      TypeOrmModule.forFeature([UserRepository]),
    ],
    controllers: [UserController],
    providers: [
      UserService,
      UserRepository,
      JwtStrategy
    ],
    exports: [UserService],
  })
  export class UserModule {}

  