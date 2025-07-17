import { Command, CommandRunner, Option } from 'nest-commander';
import { ConsumerService } from '../message-bus/rabbitmq/consumer/consumer.service';

interface BasicCommandOptions {
  limit: number;
}

@Command({
  name: 'handle-messages',
  description: 'Consume messages from RabbitMQ',
})
export class HandleMessagesCommand extends CommandRunner {
  constructor(private readonly consumerService: ConsumerService) {
    super();
  }

  async run(_: string[], options: BasicCommandOptions): Promise<void> {
    console.log('CLI Command reached');
    console.log(`Limit: ${options.limit}`);
    await this.consumerService.consumeMessages(options.limit);
  }

  @Option({
    flags: '-l, --limit <limit>',
    description: 'Limit number of messages to process',
    defaultValue: 10,
  })
  parseLimit(val: string): number {
    return Number(val);
  }
}
