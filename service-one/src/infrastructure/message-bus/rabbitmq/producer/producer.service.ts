import { Injectable } from '@nestjs/common';
import { RabbitMQPublisher } from '../rabbitmq.publisher';

@Injectable()
export class ProducerService {
  constructor(private readonly rabbitPublisher: RabbitMQPublisher) {}

  async sendStudentCreated(name: string, email: string): Promise<void> {
    const student = { name, email };
    await this.rabbitPublisher.publishStudentCreated(student);
  }
}
