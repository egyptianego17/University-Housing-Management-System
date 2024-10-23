import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class attendanceManager {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    userId!: number;
}