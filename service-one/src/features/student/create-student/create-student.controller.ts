import { Body, Controller, Post } from '@nestjs/common';
import { CreateStudentService } from './create-student.service';

@Controller('students')
export class CreateStudentController {
  constructor(private readonly createStudentService: CreateStudentService) {}

  @Post()
  async create(@Body() body: { name: string; email: string }) {
    return this.createStudentService.create(body);
  }
}
