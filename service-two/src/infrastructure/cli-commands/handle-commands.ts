import { CommandFactory } from 'nest-commander';
import { ConsumerModule } from '../message-bus/rabbitmq/consumer/consumer.module';

async function bootstrap() {
  const command = process.argv[2];

  const commandMap = {
    'handle-messages': ConsumerModule,
  };

  if (!command || !commandMap[command]) {
    console.error(`Unknown command: ${command}`);
    process.exit(1);
  }

  await CommandFactory.runWithoutClosing(commandMap[command]);
}

bootstrap();
