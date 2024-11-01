import { IsArray, IsNumber, Max, Min } from 'class-validator';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

export class CreateAttendanceAndFloorManagerDto extends CreateUserDto {
    @IsArray()
    @IsNumber({}, { each: true })
    @Min(0, { each: true })
    @Max(10, { each: true })
    floors: [];
}
