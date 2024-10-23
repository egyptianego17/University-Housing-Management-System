import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { user } from './user';
import { student } from './student';

@Entity()
export class notification {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id!: number;

    @ManyToOne(() => user)
    @JoinColumn({ name: 'issuedBy' })
    issuedBy!: user;

    @ManyToOne(() => student)
    @JoinColumn({ name: 'userId' })
    user!: student;

    @Column({ type: 'varchar', length: 255 })
    title!: string;

    @Column({ type: 'text' })
    description!: string;

    @Column({ type: 'datetime' })
    date!: Date;
}
