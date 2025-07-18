import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';
import { InboxMessageStatus } from './enums/inbox-message-status.enum';

@Entity('inbox_messages')
export class InboxMessage {
  @PrimaryColumn()
  id: string;

  @Column()
  eventType: string;

  @Column('jsonb')
  payload: any;

  @Column({
    type: 'enum',
    enum: InboxMessageStatus,
    default: InboxMessageStatus.RECEIVED,
  })
  status: InboxMessageStatus;

  @CreateDateColumn()
  receivedAt: Date;
}
