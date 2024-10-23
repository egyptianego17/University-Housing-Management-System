import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { managedFloors } from './managedFloors';

@Entity()
export class floorManager {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    managerId!: number;

    @Column({ type: 'tinyint' })
    floor!: number;

    @OneToMany(() => managedFloors, (managedFloors) => managedFloors.floorManager)
    managedFloors!: managedFloors[];
}