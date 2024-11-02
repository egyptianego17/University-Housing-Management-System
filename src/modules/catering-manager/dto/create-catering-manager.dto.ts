import { IsEnum, IsArray } from 'class-validator';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

export class CreateCateringManagerDto extends CreateUserDto {
  @IsArray()
  @IsEnum(['BREAKFAST', 'LUNCH', 'DINNER'], { each: true })
  managedMeals: [];
}
