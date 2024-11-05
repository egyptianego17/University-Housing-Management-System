import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Student } from '../../student/entities/student.entity';
import { AttendanceAndFloorManager } from '../../attendance-and-floor-manager/entities/attendance-and-floor-manager.entity';

@Entity()
export class Complaint {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id!: number;

  @ManyToOne(() => Student, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'studentId' })
  student!: Student;

  @ManyToOne(() => AttendanceAndFloorManager, { nullable: true })
  @JoinColumn({ name: 'managerId' })
  manager?: AttendanceAndFloorManager;

  @Column({ type: 'timestamp' })
  issueDate!: Date;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'text' })
  body!: string;

  @Column({ type: 'text', nullable: true })
  response?: string;

  @Column({ type: 'timestamp' })
  responseDate!: Date;

  @Column({ type: 'boolean', default: false })
  solved!: boolean;
}
