import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
class User {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

  @Column({ name: 'name' })
    name: string;

  @Column({ name: 'email' })
    login: string;

  @Column({ name: 'password' })
    password: string;

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}

export default User;
