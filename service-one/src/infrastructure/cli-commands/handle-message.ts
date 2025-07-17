
import { Command, CommandRunner, Option } from 'nest-commander';
import { ProducerService } from '../../infrastructure/message-bus/rabbitmq/producer/producer.service';

interface PublishCommandOptions {
  name: string;
  email: string;
}

@Command({
  name: 'publish-message',
  description: 'Publish a student.created event to RabbitMQ',
})
export class PublishMessageCommand extends CommandRunner {
  constructor(private readonly producerService: ProducerService) {
    super();
  }

  async run(_: string[], options: PublishCommandOptions): Promise<void> {
    await this.producerService.sendStudentCreated(options.name, options.email);
    console.log('Message published:', { name: options.name, email: options.email });
  }

  @Option({
    flags: '-n, --name <name>',
    description: 'Name of the student',
    required: true,
  })
  parseName(val: string): string {
    return val;
  }

  @Option({
    flags: '-e, --email <email>',
    description: 'Email of the student',
    required: true,
  })
  parseEmail(val: string): string {
    return val;
  }
}
