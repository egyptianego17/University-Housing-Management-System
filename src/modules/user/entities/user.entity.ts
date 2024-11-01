import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Student } from '../../student/entities/student.entity';
import { CateringManager } from '../../catering-manager/entities/catering-manager.entity';
import { Attendance } from './../../attendance/entities/attendance.entity';
import { AttendanceManager } from '../../attendance-manager/entities/attendance-manager.entity';
import { FloorManager } from '../../floor-manager/entities/floor-manager.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  password!: string;
  
  @Column({ type: 'varchar', length: 255 })
  salt!: string;
  
  @Column({ type: 'varchar', length: 25 })
  firstName!: string;

  @Column({ type: 'varchar', length: 25 })
  middleName!: string;

  @Column({ type: 'varchar', length: 25 })
  lastName!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Column({ type: 'enum', enum: ['MALE', 'FEMALE', 'HYBRID']})
  gender!: string;

  @Column({ type: 'date' })
  birthDate!: Date;

  @Column({ type: 'varchar', length: 15 }) 
  mobileNumber!: string;

  @Column({ type: 'varchar', length: 14 })
  nationalId!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  nationalIdImageUrl?: string;

  @Column({ type: 'enum', enum: ['MALE', 'FEMALE', 'HYBRID'], nullable: true })
  section!: string;

  @Column({type: 'boolean', default: false})
  isActivated!: boolean;

  @Column({type: 'enum', enum: ['STUDENT', 'CATERING_MANAGER', 'ATTENDANCE_MANAGER', 'FLOOR_MANAGER', 'ADMIN']})
  role!: string;

  @OneToOne(type => Student, student => student.user, { eager: true })
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
