import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ManagedFloor } from '../../managed-floors/entities/managed-floor.entity';

@Entity()
export class FloorManager {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  managerId!: number;

  @OneToMany(() => ManagedFloor, (managedFloors) => managedFloors.floorManager)
  managedFloors!: ManagedFloor[];
}