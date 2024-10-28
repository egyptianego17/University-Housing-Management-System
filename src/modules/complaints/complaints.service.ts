import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { UpdateComplaintDto } from './dto/update-complaint.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Complaint } from './entities/complaint.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ComplaintsService {
  constructor(
    @InjectRepository(Complaint) private repo: Repository<Complaint>,
  ) {}

  async create(createComplaintDto: CreateComplaintDto) {
    try {
      const complaint = this.repo.create(createComplaintDto);
      return await this.repo.save(complaint);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException('Complaint already exists');
      }
    }
  }

  async findAll() {
    const res = await this.repo.find();
    if (!res.length) {
      throw new HttpException(
        {
          status: HttpStatus.NO_CONTENT,
          error: 'No complaints found',
        },
        HttpStatus.NO_CONTENT,
      );
    }
  }

  async findOne(id: number) {
    const complaint = this.repo.findOne({ where: { id } });
    if (!complaint) {
      throw new NotFoundException('Complaint not found');
    }
    return complaint;
  }

  async update(id: number, updateComplaintDto: UpdateComplaintDto) {
    const complaint = await this.repo.preload({
      id,
      ...updateComplaintDto,
    });
    if (!complaint) {
      throw new NotFoundException('Complaint not found');
    }
    return await this.repo.save(complaint);
  }

  async remove(id: number) {
    const complaint = await this.repo.findOne({ where: { id } });
    if (!complaint) {
      throw new NotFoundException('Complaint not found');
    }
    return this.repo.remove(complaint);
  }
}
