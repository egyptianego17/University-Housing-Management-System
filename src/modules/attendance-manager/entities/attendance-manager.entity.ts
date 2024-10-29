import { Column, OneToMany } from 'typeorm';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ManagedFloor } from 'src/modules/managed-floors/entities/managed-floor.entity';

@Entity()
export class AttendanceManager {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  userId!: number;
  
  @Column({ type: 'tinyint'})
  floor!: number;
}
