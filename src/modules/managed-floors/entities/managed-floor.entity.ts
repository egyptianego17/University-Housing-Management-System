import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AttendanceAndFloorManager } from '../../attendance-and-floor-manager/entities/attendance-and-floor-manager.entity';
@Entity()
export class ManagedFloor {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  managerId!: number;

  @Column({ type: 'int' })
  floorNumber!: number;

  @ManyToOne(
    () => AttendanceAndFloorManager,
    (attendanceAndFloorManager) => attendanceAndFloorManager.managedFloors,
  )
  @JoinColumn({ name: 'managerId' })
  attendanceAndFloorManager!: AttendanceAndFloorManager;
}
