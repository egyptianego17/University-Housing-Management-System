import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Attendance {
  @PrimaryColumn({ type: 'bigint' })
  userId!: number;

  @PrimaryColumn({ type: 'date' })
  date!: Date;

  @Column({ type: 'boolean', nullable: true })
  tookBreakfast?: boolean;

  @Column({ type: 'boolean', nullable: true })
  tookLunch?: boolean;

  @Column({ type: 'boolean', nullable: true })
  tookDinner?: boolean;
}
