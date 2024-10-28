// attendance-manager.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class AttendanceManager {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id!: number;

  @ManyToOne(() => User, (user) => user.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  userId!: number;

  @JoinColumn({ name: 'userId' })
  user!: User;
}
