import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { OutboxMessage } from '../../../domain/outbox-message/outbox-message.entity';
import { OutboxMessageStatus } from '../../../domain/outbox-message/enums/outbox-message-status.enum';

@Injectable()
export class OutboxMessageRepository extends Repository<OutboxMessage> {
  constructor(dataSource: DataSource) {
    super(OutboxMessage, dataSource.createEntityManager());
  }

  async getPendingMessages(limit: number): Promise<OutboxMessage[]> {
    return this.find({
      where: { status: OutboxMessageStatus.PENDING },
      order: { createdAt: 'ASC' },
      take: limit,
    });
  }

  async markAsSent(id: string) {
    await this.update(id, { status: OutboxMessageStatus.SENT });
  }
}
