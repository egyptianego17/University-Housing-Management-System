import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
@Entity()
export class Student {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  studentId!: number;

  @Column({ type: 'varchar', length: 255 })
  address!: string;

  @Column({ type: 'varchar', length: 255 })
  faculty!: string;

  @Column({ type: 'int' })
  grade!: number;

  @Column({ type: 'int', nullable: true })
  lastYearAcademicGrade?: number;

  @Column({ type: 'boolean', nullable: true })
  disability?: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  studentIdImageUrl?: string;

  @Column({ type: 'int' })
  room!: number;

  @Column({ type: 'int' })
  floor!: number;

  @OneToOne(() => User, (user) => user.student, { eager: false })
  @JoinColumn()
  user: User;
}
