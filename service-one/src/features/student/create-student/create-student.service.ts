import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OutboxMessageStatus } from '../../../domain/outbox-message/enums/outbox-message-status.enum';
import { OutboxMessageRepository } from 'src/infrastructure/repository/outbox-message/outbox-message.repository';

@Injectable()
export class CreateStudentService {
  constructor(
    @InjectRepository(OutboxMessageRepository)
    private readonly outboxRepo: OutboxMessageRepository,
  ) {}

  async create(payload: { name: string; email: string }) {
    const outbox = this.outboxRepo.create({
      eventType: process.env.RABBITMQ_ROUTINGKEY,
      payload,
      status: OutboxMessageStatus.PENDING,
    });

    await this.outboxRepo.save(outbox);

    return { message: 'Student event saved to outbox.' };
  }
}
