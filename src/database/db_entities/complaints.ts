import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { student } from './student';
import { floorManager } from './floorManager';

@Entity()
export class complaints {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id!: number;

    @ManyToOne(() => student, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'studentId' })
    student!: student;

    @ManyToOne(() => floorManager, { nullable: true })
    @JoinColumn({ name: 'managerId' })
    manager?: floorManager;

    @Column({ type: 'datetime' })
    issueDate!: Date;

    @Column({ type: 'varchar', length: 255 })
    title!: string;

    @Column({ type: 'text' })
    body!: string;

    @Column({ type: 'text', nullable: true })
    response?: string;

    @Column({ type: 'datetime' })
    responseDate!: Date;

    @Column({ type: 'boolean', default: false })
    solved!: boolean;
}