import { Column } from 'typeorm';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AttendanceManager {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  userId!: number;

  @Column({ type: 'tinyint' })
  floor!: number;
}
