import { Module } from '@nestjs/common';
import { CreateStudentController } from './create-student.controller';
import { CreateStudentService } from './create-student.service';
import { RabbitMQModule } from '../../../infrastructure/message-bus/rabbitmq/rabbitmq.module';
import { OutboxMessageRepository } from 'src/infrastructure/repository/outbox-message/outbox-message.repository';
@Module({
  imports: [RabbitMQModule],
  controllers: [CreateStudentController],
  providers: [CreateStudentService, OutboxMessageRepository],
})
export class CreateStudentModule {}
