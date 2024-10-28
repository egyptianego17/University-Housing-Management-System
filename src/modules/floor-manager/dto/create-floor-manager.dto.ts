import { IsArray, IsNumber, IsPositive, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateManagedFloorDto } from '../../managed-floors/dto/create-managed-floor.dto';

export class CreateFloorManagerDto {
  @IsNumber()
  @IsPositive()
  floor: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateManagedFloorDto)
  managedFloors: CreateManagedFloorDto[];
}
