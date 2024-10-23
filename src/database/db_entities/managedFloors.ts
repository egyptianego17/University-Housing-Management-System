import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { floorManager } from './floorManager';

@Entity()
export class managedFloors {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    managerId!: number;

    @Column({ type: 'tinyint' })
    floorNumber!: number;

    @ManyToOne(() => floorManager, (floorManager) => floorManager.managedFloors)
    @JoinColumn({ name: 'managerId' }) 
    floorManager!: floorManager;
}