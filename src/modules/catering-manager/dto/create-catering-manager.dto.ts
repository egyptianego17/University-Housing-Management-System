import { IsString, IsEmail, IsStrongPassword, IsEnum, Length, IsDate, IsMobilePhone, IsOptional, IsNotEmpty, IsNumber, Min, Max, IsBoolean, IsArray} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
export class CreateCateringManagerDto extends CreateUserDto {  
    @IsArray()
    @IsEnum(['BREAKFAST', 'LUNCH', 'DINNER'], { each: true })
    managedMeals: []
}
