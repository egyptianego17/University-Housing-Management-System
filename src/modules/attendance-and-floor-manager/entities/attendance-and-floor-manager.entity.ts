import { PrimaryGeneratedColumn, OneToMany, Entity } from 'typeorm';
import { ManagedFloor } from '../../managed-floors/entities/managed-floor.entity';

@Entity()
export class AttendanceAndFloorManager {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  managerId!: number;

  @OneToMany(
    () => ManagedFloor,
    (managedFloors) => managedFloors.attendanceAndFloorManager,
  )
  managedFloors!: ManagedFloor[];
}
