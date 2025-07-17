import * as dotenv from 'dotenv';
dotenv.config();
import { Injectable, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';
import { ConsumeStudentService } from '../../../features/student/consume-student/consume-student.service';

@Injectable()
export class RabbitMQService implements OnModuleInit {
  private readonly queue = process.env.RABBITMQ_QUEUE;
  private readonly exchange = process.env.RABBITMQ_EXCHANGE;
  private readonly routingKey = process.env.RABBITMQ_ROUTINGKEY;
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  constructor(private readonly studentService: ConsumeStudentService) {}

  async onModuleInit() {
     console.log('RabbitMQService initialized');
    this.connection = await amqp.connect(process.env.RABBITMQ_URL);
    this.channel = await this.connection.createChannel();

    await this.channel.assertExchange(this.exchange, 'direct', { durable: true });
    await this.channel.assertQueue(this.queue, { durable: true });
    await this.channel.bindQueue(this.queue, this.exchange, this.routingKey);

    console.log('Waiting for messages in %s.', this.queue);

    this.channel.consume(this.queue, async (msg) => {
      if (msg) {
        const content = msg.content.toString();
        const data = JSON.parse(content);
        console.log('Received message:', data);

        await this.studentService.handleStudentCreated(data);
        this.channel.ack(msg);
      }
    });
  }
}
