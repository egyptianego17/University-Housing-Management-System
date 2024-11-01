import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ManagedMeal } from '../../managed-meals/entities/managed-meal.entity';

@Entity()
export class CateringManager {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  managerId!: number;

  @OneToMany(() => ManagedMeal, (managedMeals) => managedMeals.cateringManager)
  managedMeals!: ManagedMeal[];
}
