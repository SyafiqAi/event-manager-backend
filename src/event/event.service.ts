import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { GetEventsQueryDto } from './dto/get-events-query.dto';
import { contains } from 'class-validator';

@Injectable()
export class EventService {
  constructor(private readonly prismaService: PrismaService) {}
  create(dto: CreateEventDto) {
    return this.prismaService.event.create({ data: dto });
  }

  async findAll(query: GetEventsQueryDto) {
    const page = query.page ? query.page : 1;
    const limit = query.limit ? query.limit : 10;
    const skip = (page - 1) * limit;

    const [data, total] = await this.prismaService.$transaction([
      this.prismaService.event.findMany({
        where: {
          status: query.status,
          startDate: query.fromDate ? { gte: query.fromDate } : undefined,
          endDate: query.toDate ? { lte: query.toDate } : undefined,
          AND: {
            name: query.search
              ? { contains: query.search, mode: 'insensitive' }
              : undefined,
          },
        },
        skip,
        take: limit,
        orderBy: {
          startDate: 'asc',
        },
      }),
      this.prismaService.event.count({
        where: {
          status: query.status,
          startDate: query.fromDate ? { gte: query.fromDate } : undefined,
          endDate: query.toDate ? { lte: query.toDate } : undefined,
          AND: {
            name: query.search
              ? { contains: query.search, mode: 'insensitive' }
              : undefined,
          },
        },
      }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  findOne(id: number) {
    return this.prismaService.event.findUnique({ where: { id } });
  }

  update(id: number, dto: Partial<CreateEventDto>) {
    return this.prismaService.event.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prismaService.event.delete({ where: { id } });
  }
}
