import * as dotenv from 'dotenv';
dotenv.config();
import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';
import { ConsumeStudentService } from '../../../features/student/consume-student/consume-student.service';
import { InboxMessageRepository } from '../../repository/inbox-message.repository';
@Injectable()
export class RabbitMQService {
  private readonly queue = process.env.RABBITMQ_QUEUE;
  private readonly exchange = process.env.RABBITMQ_EXCHANGE;
  private readonly routingKey = process.env.RABBITMQ_ROUTINGKEY;
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  constructor(
    private readonly studentService: ConsumeStudentService,
    private readonly inboxRepo: InboxMessageRepository,
  ) {}

  async consumeMessage() {
    this.connection = await amqp.connect(process.env.RABBITMQ_URL);
    this.channel = await this.connection.createChannel();

    await this.channel.assertExchange(this.exchange, 'direct', {
      durable: true,
    });
    await this.channel.assertQueue(this.queue, { durable: true });
    await this.channel.bindQueue(this.queue, this.exchange, this.routingKey);

    console.log('Waiting for messages in %s.', this.queue);

    this.channel.consume(this.queue, async (msg) => {
      if (!msg) return;

      const content = msg.content.toString();
      const data = JSON.parse(content);
      const messageId = msg.properties.messageId;

      try {
        const alreadyProcessed = await this.inboxRepo.isProcessed(messageId);
        if (alreadyProcessed) {
          console.log(`Duplicate message skipped: ${messageId}`);
          this.channel.ack(msg);
          return;
        }
        await this.inboxRepo.saveIfNotExists(
          messageId,
          'student.created',
          data,
        );
        await this.studentService.handleStudentCreated(data);

        await this.inboxRepo.markAsProcessed(messageId);

        console.log(`Successfully processed message ID: ${messageId}`);
        this.channel.ack(msg);
      } catch (err) {
        console.error(`Error processing message ID ${messageId}:`, err);
      }
    });
  }
}
