import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Student } from '../../student/entities/student.entity';
import { FloorManager } from '../../floor-manager/entities/floor-manager.entity';

@Entity()
export class Complaint {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id!: number;

  @ManyToOne(() => Student, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'studentId' })
  student!: Student;

  @ManyToOne(() => FloorManager, { nullable: true })
  @JoinColumn({ name: 'managerId' })
  manager?: FloorManager;

  @Column({ type: 'datetime' })
  issueDate!: Date;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'text' })
  body!: string;

  @Column({ type: 'text', nullable: true })
  response?: string;

  @Column({ type: 'datetime' })
  responseDate!: Date;

  @Column({ type: 'boolean', default: false })
  solved!: boolean;
}
