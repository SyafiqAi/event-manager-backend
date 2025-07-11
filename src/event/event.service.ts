import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventService {
  constructor(private readonly prismaService: PrismaService) {}
  create(dto: CreateEventDto) {
    return this.prismaService.event.create({ data: dto });
  }

  findAll() {
    return this.prismaService.event.findMany();
  }

  findOne(id: number) {
    return this.prismaService.event.findUnique({ where: { id } });
  }

  update(id: number,dto: Partial<CreateEventDto>) {
    return this.prismaService.event.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prismaService.event.delete({ where: { id } });
  }
}
