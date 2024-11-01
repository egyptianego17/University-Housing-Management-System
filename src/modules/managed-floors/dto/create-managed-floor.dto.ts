import { IsInt, IsPositive } from 'class-validator';

export class CreateManagedFloorDto {
  @IsInt()
  @IsPositive()
  floorNumber!: number;

  @IsInt()
  @IsPositive()
  managerId!: number;
}
