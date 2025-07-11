import { Body, Injectable, Param } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventService {
  constructor(private readonly prismaService: PrismaService) {}
  create(@Body() dto: CreateEventDto) {
    return this.prismaService.event.create({ data: dto });
  }

  findAll() {
    return this.prismaService.event.findMany();
  }

  findOne(@Param('id') id: number) {
    return this.prismaService.event.findUnique({ where: { id } });
  }

  update(@Param('id') id: number, @Body() dto: Partial<CreateEventDto>) {
    return this.prismaService.event.update({ where: { id }, data: dto });
  }

  remove(@Param('id') id: number) {
    return this.prismaService.event.delete({ where: { id } });
  }
}
