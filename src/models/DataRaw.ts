import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import Station from './Station';

@Entity('data_raw')
class DataRaw {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

  @ManyToOne(() => Station)
  @JoinColumn({ name: 'station_id' })
    station: Station;

  @CreateDateColumn({ name: 'date_register' })
    dateRegister: Date;

  @Column({ name: 'particulate_material_two_five', type: 'numeric' })
    particulateMaterialTwoFive: number;

  @Column({ name: 'particulate_material_ten', type: 'numeric' })
    particulateMaterialTen: number;

  @Column({ name: 'carbon_monoxide', type: 'numeric' })
    carbonMonoxide: number;

  @Column({ name: 'sulfur_dioxide', type: 'numeric' })
    sulfurDioxide: number;

  @Column({ name: 'nitrogen_dioxide', type: 'numeric' })
    nitrogenDioxide: number;

  @Column({ name: 'ozone', type: 'numeric' })
    ozone: number;

  @Column({ name: 'temperature', type: 'numeric' })
    temperature: number;

  @Column({ name: 'humidity', type: 'numeric' })
    humidity: number;

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}

export default DataRaw;
