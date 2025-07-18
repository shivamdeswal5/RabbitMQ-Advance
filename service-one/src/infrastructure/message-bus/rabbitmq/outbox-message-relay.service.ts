import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OutboxMessageRepository } from '../../repository/outbox-message/outbox-message.repository';
import { ProducerService } from './producer/producer.service';
import { OutboxMessageStatus } from '../../../domain/outbox-message/enums/outbox-message-status.enum';

@Injectable()
export class OutboxMessageRelayService {
  constructor(
    private readonly producerService: ProducerService,
    @InjectRepository(OutboxMessageRepository)
    private readonly outboxRepo: OutboxMessageRepository,
  ) {}

  async dispatchMessages(limit: number): Promise<void> {
    const messages = await this.outboxRepo.getPendingMessages(limit);

    if (!messages.length) {
      console.log('No messages to dispatch');
      return;
    }

    for (const message of messages) {
      try {
        await this.producerService.sendStudentCreated(
          message.payload.name,
          message.payload.email,
        );

        message.status = OutboxMessageStatus.SENT;
        await this.outboxRepo.save(message);
      } catch (err) {
        console.error(`Failed to send message ID ${message.id}`, err);
      }
    }

    console.log(`Dispatched ${messages.length} message(s) from Outbox`);
  }
}
