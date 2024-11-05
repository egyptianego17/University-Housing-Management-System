import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { Student } from '../../student/entities/student.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'issuedBy' })
  issuedBy!: User;

  @ManyToOne(() => Student)
  @JoinColumn({ name: 'userId' })
  user!: Student;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'timestamp' })
  date!: Date;
}
