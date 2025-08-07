import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Contacto {
  @PrimaryGeneratedColumn()
  id_contacto!: number;

  @Column()
  nombre!: string;

  @Column()
  apellido!: string;

  @Column()
  correo!: string;

  @Column()
  telefono!: string;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_creacion!: Date;
}