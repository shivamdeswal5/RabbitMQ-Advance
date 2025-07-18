import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InboxMessage } from '../../domain/inbox-message/inbox-message.entity';
import { InboxMessageStatus } from '../../domain/inbox-message/enums/inbox-message-status.enum';

@Injectable()
export class InboxMessageRepository extends Repository<InboxMessage> {
  constructor(dataSource: DataSource) {
    super(InboxMessage, dataSource.createEntityManager());
  }

  async isProcessed(id: string): Promise<boolean> {
    const message = await this.findOneBy({ id });
    return !!message && message.status === InboxMessageStatus.PROCESSED;
  }

  async saveIfNotExists(id: string, eventType: string, payload: any) {
    const existing = await this.findOneBy({ id });
    if (existing) return;

    const inbox = this.create({
      id,
      eventType,
      payload,
      status: InboxMessageStatus.RECEIVED,
    });
    await this.save(inbox);
  }

  async markAsProcessed(id: string) {
    await this.update({ id }, { status: InboxMessageStatus.PROCESSED });
  }
}
