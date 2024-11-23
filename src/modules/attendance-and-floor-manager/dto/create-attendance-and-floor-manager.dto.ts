import { IsArray, IsNumber, Max, Min } from 'class-validator';
import { ManagedFloor } from 'src/modules/managed-floors/entities/managed-floor.entity';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

export class CreateAttendanceAndFloorManagerDto extends CreateUserDto {
  @IsArray()
  @IsNumber({}, { each: true })
  @Min(0, { each: true })
  @Max(10, { each: true })
  managedFloors: ManagedFloor[];
}
