import { CommandFactory } from 'nest-commander';
import { ProducerModule } from '../message-bus/rabbitmq/producer/producer.module';

async function bootstrap() {
  await CommandFactory.run(ProducerModule, ['warn']);
}

bootstrap();
