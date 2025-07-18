import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { spawn } from 'child_process';

@Injectable()
export class CronCommandRunnerService{
  private readonly logger = new Logger(CronCommandRunnerService.name);

  @Cron('*/10 * * * * *')
  runPublishCommand() {
    this.logger.log('Triggering CLI publish-message command...');

    const cmd = spawn('npm', ['run', 'handle-messages', '--', 'publish-message'], {
      cwd: process.cwd(),
      shell: true,
    });

    cmd.stdout.on('data', (data) => {
      console.log(`CLI STDOUT: ${data}`);
    });

    cmd.stderr.on('data', (data) => {
      console.error(`CLI STDERR: ${data}`);
    });

    cmd.on('close', (code) => {
      this.logger.log(`CLI process exited with code ${code}`);
    });
  }
}
