import { IsOptional, IsArray, IsEnum } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateCateringManagerDto } from './create-catering-manager.dto';

export class UpdateCateringManagerDto extends PartialType(
  CreateCateringManagerDto,
) {
  @IsOptional()
  @IsArray()
  @IsEnum(['BREAKFAST', 'LUNCH', 'DINNER'], { each: true })
  managedMeals?: [];
}
