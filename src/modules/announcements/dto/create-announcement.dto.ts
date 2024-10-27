import { IsString, IsNumber } from 'class-validator';
export class CreateAnnouncementDto {
  @IsNumber()
  managerId: number;

  @IsNumber()
  floor: number;

  @IsString()
  title: string;

  @IsString()
  body: string;
}
