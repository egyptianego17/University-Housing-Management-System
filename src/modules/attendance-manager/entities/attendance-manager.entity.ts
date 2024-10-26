import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AttendanceManager {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  userId!: number;
}
