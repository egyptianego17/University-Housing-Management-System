import { PartialType } from '@nestjs/mapped-types';
import { CreateCateringManagerDto } from './create-catering-manager.dto';

export class UpdateCateringManagerDto extends PartialType(CreateCateringManagerDto) {}
