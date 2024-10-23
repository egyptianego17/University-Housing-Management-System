import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class attendance {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    userId!: number;

    @Column({ type: 'date' })
    date!: Date;

    @Column({ type: 'boolean', nullable: true })
    tookBreakfast?: boolean;

    @Column({ type: 'boolean', nullable: true })
    tookLunch?: boolean;

    @Column({ type: 'boolean', nullable: true })
    tookDinner?: boolean;
}
