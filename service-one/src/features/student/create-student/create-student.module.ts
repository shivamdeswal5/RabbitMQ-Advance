import { Module } from '@nestjs/common';
import { CreateStudentController } from './create-student.controller';
import { CreateStudentService } from './create-student.service';
import { RabbitMQModule } from '../../../infrastructure/message-bus/rabbitmq/rabbitmq.module';


@Module({
  imports: [RabbitMQModule],
  controllers: [CreateStudentController],
  providers: [CreateStudentService],
})
export class CreateStudentModule {}
