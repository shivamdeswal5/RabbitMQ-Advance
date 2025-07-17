import { Module } from '@nestjs/common';
import { RabbitMQModule } from '../rabbitmq.module';
import { PublishMessageCommand } from '../../../cli-commands/handle-message';
import { ProducerService } from './producer.service';

@Module({
  imports: [RabbitMQModule],
  providers: [ProducerService, PublishMessageCommand],
  exports: [ProducerService],
})
export class ProducerModule {}
