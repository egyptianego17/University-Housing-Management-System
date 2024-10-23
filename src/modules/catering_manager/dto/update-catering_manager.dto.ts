import { PartialType } from '@nestjs/swagger';
import { CreateCateringManagerDto } from './create-catering_manager.dto';

export class UpdateCateringManagerDto extends PartialType(CreateCateringManagerDto) {}
