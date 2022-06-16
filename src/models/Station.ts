import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('station')
class Station {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

  @Column({ name: 'name' })
    name: string;

  @Column({ name: 'latitude', type: 'numeric' })
    latitude: number;

  @Column({ name: 'longitude', type: 'numeric' })
    longitude: number;

  @Column({ name: 'is_active', default: true })
    isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}

export default Station;
