import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { managedMeals } from './managedMeals';

@Entity()
export class cateringManager {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    managerId!: number;

    @OneToMany(() => managedMeals, (managedMeals) => managedMeals.cateringManager)
    managedMeals!: managedMeals[]; 
}