import { Injectable } from '@nestjs/common';
import { CreateCateringManagerDto } from './dto/create-catering-manager.dto';
import { SignUpResponse } from '../auth/interfaces/signup-response.interface';
@Injectable()
export class CateringManagerService {

  async addCateringManager (createStudent: CreateCateringManagerDto): Promise<SignUpResponse> {
    /* To DO */
    return { message: 'To DO', success: false };
  }

}
