import { Injectable } from '@nestjs/common';
import { RabbitMQPublisher } from '../../../infrastructure/message-bus/rabbitmq/rabbitmq.publisher';

@Injectable()
export class CreateStudentService {
  constructor(private readonly publisher: RabbitMQPublisher) {}

  async create(payload: { name: string; email: string }) {
    await this.publisher.publishStudentCreated(payload);
    return { message: 'Student created and message sent' };
  }
}
