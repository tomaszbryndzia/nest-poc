import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  action_type: string;

  @Column()
  action_id: number;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  constructor(log: Partial<Log>) {
    Object.assign(this, log);
  }
}
