import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronCommandRunnerService } from './cron-command-runner.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [CronCommandRunnerService],
})
export class CronModule {}
