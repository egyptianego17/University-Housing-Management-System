import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class student {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    studentId!: number;

    @Column({ type: 'varchar', length: 255 })
    address!: string;

    @Column({ type: 'varchar', length: 255 })
    faculty!: string;

    @Column({ type: 'tinyint' })
    grade!: number;

    @Column({ type: 'tinyint', nullable: true })
    lastYearAcademicGrade?: number; 

    @Column({ type: 'boolean', nullable: true })
    disability?: boolean; 

    @Column({ type: 'varchar', length: 255, nullable: true })
    studentIdImageUrl?: string;  

    @Column({ type: 'varchar', length: 255 })
    room!: string;

    @Column({ type: 'varchar', length: 255 })
    floor!: string;
}
