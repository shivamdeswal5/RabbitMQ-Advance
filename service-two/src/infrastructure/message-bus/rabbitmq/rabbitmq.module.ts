import { Module, forwardRef } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { ConsumeStudentModule } from '../../../features/student/consume-student/consume-student.module';

@Module({
  imports: [forwardRef(() => ConsumeStudentModule)],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}
