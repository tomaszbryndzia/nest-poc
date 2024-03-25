import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ default: 'BASIC' })
  role: 'BASIC' | 'ADMIN';

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
