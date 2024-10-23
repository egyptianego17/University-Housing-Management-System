import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { user } from './user';

@Entity()
export class announcements {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id!: number;

    @ManyToOne(() => user)
    @JoinColumn({ name: 'managerId' })
    manager!: user;

    @Column({ type: 'tinyint' })
    floor!: number;

    @Column({ type: 'varchar', length: 255 })
    title!: string;

    @Column({ type: 'text' })
    body!: string;

    @Column({ type: 'datetime' })
    date!: Date;
}