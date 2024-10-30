import { PassportModule } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UserRepository } from "../user/user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { EncryptionUtil } from "src/utils/encryption.util";
import { JwtService } from "@nestjs/jwt";   
@Injectable()
export class JwtStrategy extends Strategy {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_KEY,
    });
  }

  async validate(payload: any) {
    try {
        console.log('Encrypted Payload:', payload);

        const decoded = this.jwtService.decode(payload) as { encryptedData: string };
        console.log('Decoded JWT Payload:', decoded);

        if (!decoded?.encryptedData) {
            throw new Error('Encrypted data not found in decoded payload.');
        }

        const decryptedPayload = await EncryptionUtil.decryptPayload(decoded.encryptedData);
        console.log('Decrypted Payload:', decryptedPayload);

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