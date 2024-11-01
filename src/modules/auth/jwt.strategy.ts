import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "../user/user.repository";
import { EncryptionUtil } from "src/utils/encryption.util";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_KEY,
    });
  }

  async validate(payload: any) {
    try {
      const decryptedPayload = await EncryptionUtil.decryptPayload(payload.encryptedData);

      const user = await this.userRepository.findOneByEmail(decryptedPayload.email);
      
      if (!user) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (error) {
      console.error('Validation error:', error);
      throw new UnauthorizedException();
    }
  }
}
