import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { OutboxMessageStatus } from './enums/outbox-message-status.enum';

@Entity('outbox_messages')
export class OutboxMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  eventType: string;

  @Column('jsonb')
  payload: any;

  @Column({
    type: 'enum',
    enum: OutboxMessageStatus,
    default: OutboxMessageStatus.PENDING,
  })
  status: OutboxMessageStatus;

  @CreateDateColumn()
  createdAt: Date;
}
