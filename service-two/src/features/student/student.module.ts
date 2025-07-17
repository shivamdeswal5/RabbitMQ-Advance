import { Module } from '@nestjs/common';
import { ConsumeStudentModule } from './consume-student/consume-student.module';
import { RabbitMQModule } from '../../infrastructure/message-bus/rabbitmq/rabbitmq.module';

@Module({
  imports: [ConsumeStudentModule, RabbitMQModule],
})
export class StudentModule {}