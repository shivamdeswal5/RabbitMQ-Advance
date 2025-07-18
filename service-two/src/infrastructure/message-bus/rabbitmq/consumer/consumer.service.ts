import { Injectable } from '@nestjs/common';
import { RabbitMQService } from '../rabbitmq.service';

@Injectable()
export class ConsumerService {
  constructor(private readonly rabbitService: RabbitMQService) {}

  async consumeMessages(limit = 10) {
    await this.rabbitService.consumeMessage();
  }
}
