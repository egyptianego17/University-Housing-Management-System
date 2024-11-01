import { PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ManagedFloor } from '../../managed-floors/entities/managed-floor.entity';

export class AttendanceAndFloorManager {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    managerId!: number;

    @OneToMany(() => ManagedFloor, (managedFloors) => managedFloors.floorManager)
    managedFloors!: ManagedFloor[];
}