import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { CateringManager } from '../../catering-manager/entities/catering-manager.entity';
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';

@Entity()
export class ManagedMeal {
  @PrimaryColumn({ type: 'bigint' })
  managerId!: number;

  @PrimaryColumn({ type: 'enum', enum: ['BREAKFAST', 'LUNCH', 'DINNER'] })
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

