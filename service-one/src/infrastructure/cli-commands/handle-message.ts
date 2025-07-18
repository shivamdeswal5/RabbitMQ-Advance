import { Command, CommandRunner, Option } from 'nest-commander';
import { OutboxMessageRelayService } from '../message-bus/rabbitmq/outbox-message-relay.service';

@Command({
  name: 'publish-message',
  description: 'Dispatch unsent messages from outbox',
})
export class PublishMessageCommand extends CommandRunner {
  constructor(private readonly relayService: OutboxMessageRelayService) {
    super();
  }

  async run(_: string[], options: { limit: number }) {
    await this.relayService.dispatchMessages(options.limit || 10);
  }

  @Option({
    flags: '-l, --limit <limit>',
    description: 'Number of messages to dispatch',
    defaultValue: 10,
  })
  parseLimit(val: string): number {
    return Number(val);
  }
}
