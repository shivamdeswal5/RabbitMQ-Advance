import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { spawn } from 'child_process';
import * as dotenv from 'dotenv';

dotenv.config(); 

@Injectable()
export class CronCommandRunnerService {
  private readonly logger = new Logger(CronCommandRunnerService.name);

  @Cron('30 2 * * *') 
  handleCron() {
    this.logger.log('Running CLI command via cron...');

    const child = spawn('npm', ['run', 'handle-messages', '--', 'handle-messages', '-l', '5'], {
      shell: true,
      env: process.env,
    });

    child.stdout.on('data', (data) => {
      this.logger.log(`STDOUT: ${data.toString().trim()}`);
    });

    child.stderr.on('data', (data) => {
      this.logger.error(`STDERR: ${data.toString().trim()}`);
    });

    child.on('exit', (code) => {
      this.logger.log(`Child process exited with code ${code}`);
    });
  }
}
