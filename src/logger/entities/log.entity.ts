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
  params: string;

  @Column()
  method: 'PUT' | 'POST' | 'PATCH' | 'DELETE';

  @Column()
  url: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  constructor(log: Partial<Log>) {
    Object.assign(this, log);
  }
}
