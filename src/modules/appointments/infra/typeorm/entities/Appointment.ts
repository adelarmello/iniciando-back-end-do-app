import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string; // Coluna no BD

  @ManyToOne(() => User) // Muitos agendamentos para um user(prestador de serviço)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column()
  user_id: string; // Coluna no BD

  @ManyToOne(() => User) // Muitos agendamento pra um usuário(cliente)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
