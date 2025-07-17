
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../../../domain/student/student.entity';
import { ConsumeStudentService } from './consume-student.service';
import { RabbitMQModule } from '../../../infrastructure/message-bus/rabbitmq/rabbitmq.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    forwardRef(() => RabbitMQModule),
  ],
  providers: [ConsumeStudentService],
  exports: [ConsumeStudentService], 
})
export class ConsumeStudentModule {}
