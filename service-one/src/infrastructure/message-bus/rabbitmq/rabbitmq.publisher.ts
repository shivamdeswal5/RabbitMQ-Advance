import * as amqp from 'amqplib';
import { Injectable, OnModuleInit } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
dotenv.config();

@Injectable()
export class RabbitMQPublisher implements OnModuleInit {
  private connection: amqp.Connection;
  private channel: amqp.Channel;
  private readonly exchange = process.env.RABBITMQ_EXCHANGE;
  private readonly routingKey = process.env.RABBITMQ_ROUTINGKEY;

  async onModuleInit() {
    this.connection = await amqp.connect(process.env.RABBITMQ_URL);
    this.channel = await this.connection.createChannel();
    await this.channel.assertExchange(this.exchange, 'direct', {
      durable: true,
    });
  }

  async publishStudentCreated(student: { name: string; email: string }) {
    if (!this.channel) throw new Error('RabbitMQ channel is not initialized.');

    const messageId = uuidv4();
    const payload = Buffer.from(JSON.stringify(student));
    this.channel.publish(this.exchange, this.routingKey, payload, {
      messageId,
      contentType: 'application/json',
      persistent: true,
    });
    console.log('Message sent to exchange:', this.exchange, {
      messageId,
      ...student,
    });
  }
}
