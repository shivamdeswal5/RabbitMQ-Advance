
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '../../../domain/student/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConsumeStudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
  ) {}

  async handleStudentCreated(data: { name: string; email: string }) {
    console.log('Saving student to DB:', data);
    const student = this.studentRepo.create(data);
    await this.studentRepo.save(student);
    console.log('Student saved to DB:', student);
  }
}
