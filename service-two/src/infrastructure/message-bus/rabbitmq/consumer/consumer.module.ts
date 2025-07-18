import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Student } from '../../../../domain/student/student.entity';
import { ConsumeStudentService } from '../../../../features/student/consume-student/consume-student.service';
import { RabbitMQService } from '../rabbitmq.service';
import { ConsumerService } from './consumer.service';
import { HandleMessagesCommand } from '../../../cli-commands/handle-message';
import { getPostgresConfig } from '../../../config/typeorm.config';
import { InboxMessage } from 'src/domain/inbox-message/inbox-message.entity';
import { InboxMessageRepository } from 'src/infrastructure/repository/inbox-message.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getPostgresConfig,
    }),
    TypeOrmModule.forFeature([Student, InboxMessage]),
  ],
  providers: [
    RabbitMQService,
    ConsumeStudentService,
    ConsumerService,
    HandleMessagesCommand,
    InboxMessageRepository,
  ],
  exports: [ConsumerService],
})
export class ConsumerModule {}
