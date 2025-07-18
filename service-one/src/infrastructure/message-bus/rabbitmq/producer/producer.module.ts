import { Module } from '@nestjs/common';
import { RabbitMQModule } from '../rabbitmq.module';
import { PublishMessageCommand } from '../../../cli-commands/handle-message';
import { ProducerService } from './producer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OutboxMessage } from '../../../../domain/outbox-message/outbox-message.entity';
import { OutboxMessageRepository } from '../../../repository/outbox-message/outbox-message.repository';
import { OutboxMessageRelayService } from '../outbox-message-relay.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getPostgresConfig } from 'src/infrastructure/config/typeorm.config';

@Module({
  imports: [
    RabbitMQModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getPostgresConfig,
    }),
    TypeOrmModule.forFeature([OutboxMessage]),
  ],
  providers: [
    ProducerService,
    OutboxMessageRepository,
    OutboxMessageRelayService,
    PublishMessageCommand,
  ],
  exports: [ProducerService],
})
export class ProducerModule {}
