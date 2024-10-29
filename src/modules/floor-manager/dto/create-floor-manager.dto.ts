import {IsNumber, Min, Max, IsArray, IsOptional} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFloorManagerDto {  
    @IsNumber()
    @Min(0)
    @Max(10)
    floor: number;
}
