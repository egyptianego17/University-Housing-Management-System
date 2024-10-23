import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { cateringManager } from './cateringManager';

@Entity()
export class managedMeals {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    managerId!: number;

    @Column({ type: 'enum', enum: ['BREAKFAST', 'LUNCH', 'DINNER'] })
    meal!: string;

    @Column({ type: 'date' })
    date!: string;

    @ManyToOne(() => cateringManager, (cateringManager) => cateringManager.managedMeals)
    @JoinColumn({ name: 'managerId' })
    cateringManager!: cateringManager;
}