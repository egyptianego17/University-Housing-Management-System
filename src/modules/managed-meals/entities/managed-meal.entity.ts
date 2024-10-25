import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CateringManager } from 'src/modules/catering-manager/entities/catering-manager.entity';

@Entity()
export class ManagedMeal {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  managerId!: number;

  @Column({ type: 'enum', enum: ['BREAKFAST', 'LUNCH', 'DINNER'] })
  meal!: string;

  @Column({ type: 'date' })
  date!: string;

  @ManyToOne(
    () => CateringManager,
    (cateringManager: CateringManager) => cateringManager.managedMeals,
  )
  @JoinColumn({ name: 'managerId' })
  cateringManager!: CateringManager;
}
