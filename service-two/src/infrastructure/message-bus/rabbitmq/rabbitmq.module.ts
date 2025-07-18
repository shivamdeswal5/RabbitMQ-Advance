import { Module, forwardRef } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { ConsumeStudentModule } from '../../../features/student/consume-student/consume-student.module';
import { InboxMessageRepository } from 'src/infrastructure/repository/inbox-message.repository';

@Module({
  imports: [forwardRef(() => ConsumeStudentModule)],
  providers: [RabbitMQService, InboxMessageRepository],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}
