import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Student } from 'src/modules/student/entities/student.entity';
import { CateringManager } from 'src/modules/catering-manager/entities/catering-manager.entity';
import { Attendance } from 'src/modules/attendance/entities/attendance.entity';
import { AttendanceManager } from 'src/modules/attendance-manager/entities/attendance-manager.entity';
import { FloorManager } from 'src/modules/floor-manager/entities/floor-manager.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  username!: string;

  @Column({ type: 'tinyint' })
  gender!: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Column({ type: 'date' })
  birthDate!: Date;

  @Column({ type: 'varchar', length: 255 })
  mobileNumber!: string;

  @Column({ type: 'bigint' })
  nationalId!: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  nationalIdImageUrl?: string;

  @Column({ type: 'enum', enum: ['MALE', 'FEMALE', 'HYBRID'], nullable: true })
  section!: string;

  @OneToOne(() => Student)
  @JoinColumn({ name: 'student_fk', referencedColumnName: 'studentId' })
  student?: Student;

  @OneToOne(() => CateringManager)
  @JoinColumn({ name: 'cateringManager_fk', referencedColumnName: 'managerId' })
  cateringManager?: CateringManager;

  @OneToOne(() => Attendance)
  @JoinColumn({ name: 'attendance_fk', referencedColumnName: 'userId' })
  attendance?: Attendance;

  @OneToOne(() => AttendanceManager)
  @JoinColumn({ name: 'attendanceManager_fk', referencedColumnName: 'userId' })
  attendanceManager?: AttendanceManager;

  @OneToOne(() => FloorManager)
  @JoinColumn({ name: 'floorManager_fk', referencedColumnName: 'managerId' })
  floorManager?: FloorManager;
}
