import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { FloorManager } from 'src/modules/floor-manager/entities/floor-manager.entity';

@Entity()
export class ManagedFloor {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  managerId!: number;

  @Column({ type: 'tinyint' })
  floorNumber!: number;

  @ManyToOne(() => FloorManager, (floorManager) => floorManager.managedFloors)
  @JoinColumn({ name: 'managerId' })
  floorManager!: FloorManager;
}
