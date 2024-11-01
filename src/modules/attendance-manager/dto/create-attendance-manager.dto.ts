import { IsOptional, IsNumber, Min, Max, IsArray} from 'class-validator';

export class CreateAttendanceManagerDto {
  @IsArray()
  @IsNumber({}, { each: true })
  @Min(1, { each: true })
  @Max(10, { each: true })
  @IsOptional()
  managedFloors: number[];
}
