import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';

@Entity()
export class Announcement {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'managerId' })
  managerId!: number;

  @Column({ type: 'int' })
  floor!: number;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'text' })
  body!: string;

  // @Column({ type: 'datetime' })
  // date!: Date;
  @CreateDateColumn({ type: 'timestamp' })
  date: Date;
}
