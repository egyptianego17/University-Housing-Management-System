import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Announcement } from './entities/announcement.entity';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectRepository(Announcement) private repo: Repository<Announcement>,
  ) {}

  async create(createAnnouncementDto: CreateAnnouncementDto) {
    const announcement = this.repo.create(createAnnouncementDto);
    return this.repo.save(announcement);
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const announcement = await this.repo.findOne({ where: { id } });
    if (!announcement) {
      throw new NotFoundException('Announcement not found');
    }
    return announcement;
  }

  async update(id: number, updateAnnouncementDto: UpdateAnnouncementDto) {
    const announcement = await this.repo.preload({
      id,
      ...updateAnnouncementDto,
    });
    if (!announcement) {
      throw new NotFoundException('Announcement not found');
    }
    return this.repo.save(announcement);
  }

  async remove(id: number) {
    const announcement = await this.repo.findOne({ where: { id } });
    if (!announcement) {
      throw new NotFoundException('Announcement not found');
    }
    return this.repo.remove(announcement);
  }
}
