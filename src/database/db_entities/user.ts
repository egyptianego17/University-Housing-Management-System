import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { student } from './student';
import { cateringManager } from './cateringManager';
import { attendance } from './attendance';
import { attendanceManager } from './attendanceManager';
import { floorManager } from './floorManager';

@Entity()
export class user {
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
    nationalD!: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    nationaldImageUrl?: string;

    @Column({ type: 'enum', enum: ['MALE', 'FEMALE', 'HYBRID'], nullable: true })
    section?: string;

    @OneToOne(() => student)
    @JoinColumn({ name: 'student_fk', referencedColumnName: 'studentId' })
    student?: student;

    @OneToOne(() => cateringManager)
    @JoinColumn({ name: 'cateringManager_fk', referencedColumnName: 'managerId' })
    cateringManager?: cateringManager;

    @OneToOne(() => attendance)
    @JoinColumn({ name: 'attendance_fk', referencedColumnName: 'userId' })
    attendance?: attendance;

    @OneToOne(() => attendanceManager)
    @JoinColumn({ name: 'attendanceManager_fk', referencedColumnName: 'userId' })
    attendanceManager?: attendanceManager;

    @OneToOne(() => floorManager)
    @JoinColumn({ name: 'floorManager_fk', referencedColumnName: 'managerId' })
    floorManager?: floorManager;
}
